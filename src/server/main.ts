import { appRouter } from './router';
import { app, BrowserWindow, dialog, ipcMain, protocol } from 'electron';
import path, { resolve } from 'path';
import { ipcRequestHandler } from './ipcRequestHandler';
import { IpcRequest } from '../api';
import fs, { existsSync, readFileSync } from 'fs';
import {
    dbPath,
    dbUrl,
    isDev,
    latestMigration,
    Migration,
    user,
} from './constants';
// import log from 'electron-log';
// import { prisma, runPrismaCommand } from './prisma';
import { MenuBuilder } from './menu';

const customProtocol = 'mapcollab';

const createWindow = async () => {
    const dataPath = app.getPath('userData');
    const userDataPath = `${dataPath}/id.json`;

    if (existsSync(userDataPath)) {
        const data = JSON.parse(
            readFileSync(userDataPath, { encoding: 'utf-8' })
        );
        user.id = data.id;
        user.lastGroup = data.lastGroup;
    }

    // let needsMigration;
    // const dbExists = fs.existsSync(dbPath);
    // if (!dbExists) {
    //     needsMigration = true;
    //     // prisma for whatever reason has trouble if the database file does not exist yet.
    //     // So just touch it here
    //     fs.closeSync(fs.openSync(dbPath, 'w'));
    // } else {
    //     try {
    //         const latest: Migration[] =
    //             // await prisma.$queryRaw`select * from _prisma_migrations order by finished_at`;
    //         needsMigration =
    //             latest[latest.length - 1]?.migration_name !== latestMigration;
    //     } catch (e) {
    //         // log.error(e);
    //         needsMigration = true;
    //     }
    // }

    // if (needsMigration) {
    //     try {
    //         const schemaPath = path.join(
    //             app.getAppPath().replace('app.asar', 'app.asar.unpacked'),
    //             'prisma',
    //             'schema.prisma'
    //         );
    //         // log.info(
    //         //     `Needs a migration. Running prisma migrate with schema path ${schemaPath}`
    //         // );

    //         // first create or migrate the database! If you were deploying prisma to a cloud service, this migrate deploy
    //         // command you would run as part of your CI/CD deployment. Since this is an electron app, it just needs
    //         // to run every time the production app is started. That way if the user updates the app and the schema has
    //         // changed, it will transparently migrate their DB.
    //         await runPrismaCommand({
    //             command: ['migrate', 'deploy', '--schema', schemaPath],
    //             dbUrl,
    //         });
    //         // log.info('Migration done.');

    //         // seed
    //         // log.info("Seeding...");
    //         // await seed(prisma);
    //     } catch (e) {
    //         // log.error(e);
    //         process.exit(1);
    //     }
    // } else {
    //     // log.info('Does not need migration');
    // }

    // The Vite build of the client code uses src URLs like "/assets/main.1234.js" and we need to
    // intercept those requests and serve the files from the dist folder.
    protocol.interceptFileProtocol('file', (request, callback) => {
        const parsedUrl = path.parse(request.url);

        if (parsedUrl.dir.includes('assets')) {
            const webAssetPath = path.join(
                __dirname,
                '..',
                'assets',
                parsedUrl.base
            );
            callback({ path: webAssetPath });
        } else {
            callback({ url: request.url });
        }
    });

    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 1024,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadURL('https://pertinate.info');

    // setInterval(() => {
    //     const path = new URL(mainWindow.webContents.getURL()).pathname;

    //     if (path.startsWith('/group')) {
    //         user.lastGroup = path.split('/')[2];
    //     }
    //     // log.error(mainWindow.webContents.getURL());
    // }, 1000);

    // app.on('second-instance', (event, commandLine, workingDirectory) => {
    //     // Someone tried to run a second instance, we should focus our window.
    //     if (mainWindow) {
    //         if (mainWindow.isMinimized()) mainWindow.restore();
    //         mainWindow.focus();
    //     }
    //     // the commandLine is array of strings in which last element is deep link url
    //     const protocolUrl = new URL(
    //         commandLine
    //             .pop()
    //             ?.replace(`${customProtocol}://`, 'http://localhost:5173') ?? ''
    //     );
    //     protocolUrl.pathname = protocolUrl.pathname.slice(
    //         0,
    //         protocolUrl.pathname.length - 1
    //     );
    //     // log.log(protocolUrl);
    //     // valid pathnames
    //     if (!['/invite'].includes(protocolUrl.pathname)) {
    //         mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));
    //         return;
    //     }

    //     mainWindow?.loadURL('/invite');
    // });

    // const menuBuilder = MenuBuilder(mainWindow, app.name);
    // menuBuilder.buildMenu();

    // if (isDev) {
    //     // in dev mode, load the vite dev server
    //     await mainWindow.loadURL('http://localhost:5173/');
    // } else {
    //     await mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));
    // }
    // mainWindow.webContents.openDevTools();
    // mainWindow.maximize();
};

const clientExists = () => {
    return existsSync(user.clientPath);
};

let previousTarget: string | undefined = undefined;
let target: string | undefined = undefined;

app.whenReady().then(() => {
    ipcMain.handle('trpc', (event, req: IpcRequest) => {
        return ipcRequestHandler({
            endpoint: '/trpc',
            req,
            router: appRouter,
            createContext: async () => {
                return {};
            },
        });
    });
    ipcMain.handle('clienttxt', () => {
        const file = readFileSync(user.clientPath, { encoding: 'utf-8' })
            .split('\n')
            .slice(-15)
            .filter(entry => entry !== '');
        return file;
    });

    createWindow();

    // setInterval(() => {
    //     if (clientExists()) {
    //         const file = readFileSync(user.clientPath, { encoding: 'utf-8' })
    //             .split('\n')
    //             .slice(-15)
    //             .filter(entry => entry !== '');

    //         file.forEach(entry => {
    //             if (
    //                 !entry.includes('You have received an Atlas Skill Point') &&
    //                 !entry.includes('You have entered')
    //             ) {
    //                 return;
    //             }

    //             const isMapEntry = entry.includes('You have entered');

    //             if (isMapEntry) {
    //                 target = entry
    //                     .split(' : ')[1]
    //                     .split(' ')
    //                     .slice(3)
    //                     .join(' ');
    //                 target = target.slice(0, target.length - 2);

    //                 console.log(target);
    //                 prisma.user
    //                     .update({
    //                         where: {
    //                             id: user.id,
    //                         },
    //                         data: {
    //                             lastZone: target,
    //                         },
    //                     })
    //                     .catch(console.error);
    //             } else {
    //                 if (
    //                     previousTarget == undefined ||
    //                     previousTarget !== target
    //                 ) {
    //                     //update map then set target
    //                     const lastTarget = target;
    //                     (async () => {
    //                         await prisma.mapStatus.updateMany({
    //                             where: {
    //                                 name: lastTarget,
    //                                 userId: user.id,
    //                                 groupId: user.lastGroup,
    //                             },
    //                             data: {
    //                                 complete: true,
    //                             },
    //                         });
    //                     })();
    //                     previousTarget = target;
    //                     target = undefined;
    //                 }
    //             }
    //         });
    //     }
    // }, 1000);

    if (process.defaultApp) {
        if (process.argv.length >= 2) {
            app.setAsDefaultProtocolClient(customProtocol, process.execPath, [
                path.resolve(process.argv[1]),
            ]);
        }
    } else {
        app.setAsDefaultProtocolClient(customProtocol);
    }

    protocol.interceptHttpProtocol(customProtocol, req => {
        console.log('>>', req);
        return new Response();
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
