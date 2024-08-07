import { app, BrowserWindow, shell, ipcMain, protocol, dialog } from 'electron'
import { release } from 'node:os'
import path, { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { update } from './update'
import { existsSync, readFileSync } from 'node:fs'
import { user } from '../shared/user'
import { callbacks } from '../preload/callbacks'

globalThis.__filename = fileURLToPath(import.meta.url)
globalThis.__dirname = dirname(__filename)

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? join(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let mainWindow: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.mjs')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

const customProtocol = 'mapcollab'

async function createWindow() {
    const dataPath = app.getPath('userData');
    const userIdPath = `${dataPath}/id.txt`;

    if (existsSync(userIdPath)) {
        user.id = readFileSync(userIdPath, { encoding: 'utf-8' });
    }

    mainWindow = new BrowserWindow({
        title: 'Main window',
        icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
        webPreferences: {
            preload,
            // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
            // nodeIntegration: true,

            // Consider using contextBridge.exposeInMainWorld
            // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
            // contextIsolation: false,
        },
    })


    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
        // the commandLine is array of strings in which last element is deep link url
        const protocolUrl = new URL(commandLine.pop()?.replace(`${customProtocol}://`, url ?? '') ?? '');
        protocolUrl.pathname = protocolUrl.pathname.slice(0, protocolUrl.pathname.length - 1)
        // valid pathnames
        if (!['/invite'].includes(protocolUrl.pathname)) {

            mainWindow?.loadURL(indexHtml)
            return;
        }

        mainWindow?.loadURL(protocolUrl.href)
    })

    if (url) { // electron-vite-vue#298
        mainWindow.loadURL(url)
        // Open devTool if the app is not packaged
        mainWindow.webContents.openDevTools()
    } else {
        mainWindow.loadFile(indexHtml)
    }

    // Test actively push message to the Electron-Renderer
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow?.webContents.send('main-process-message', new Date().toLocaleString())
    })

    // Make all links open with the browser, not with the application
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return { action: 'deny' }
    })

    // Apply electron-updater
    update(mainWindow)
}

app.on('open-url', (event, url) => {
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
})

app.whenReady().then(async () => {
    // protocol.handle(customProtocol, (request) => {
    //     console.log(request)
    //     return new Response()
    // })
    await createWindow();

    if (process.defaultApp) {
        if (process.argv.length >= 2) {
            app.setAsDefaultProtocolClient(customProtocol, process.execPath, [path.resolve(process.argv[1])])
        }
    } else {
        app.setAsDefaultProtocolClient(customProtocol)
    }

    protocol.handle(customProtocol, (req) => {
        console.log('>>', req)
        return new Response()
    })

    // protocol.handle('foo', (req) => {
    //     console.log(req)
    //     return new Response()
    // })
})

app.on('window-all-closed', () => {
    mainWindow = null
    if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
    if (mainWindow) {
        // Focus on the main window if the user tried to open another
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
    }
})

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
        allWindows[0].focus()
    } else {
        createWindow()
    }
})

Object.entries(callbacks).forEach(([key, value]) => {
    ipcMain.on(`${key}-server`, (event, data) => {
        event.reply(`${key}-client`, value(data))
    });
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
    const childWindow = new BrowserWindow({
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    if (process.env.VITE_DEV_SERVER_URL) {
        childWindow.loadURL(`${url}#${arg}`)
    } else {
        childWindow.loadFile(indexHtml, { hash: arg })
    }
})

