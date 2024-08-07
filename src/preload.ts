// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import type { IElectronAPI } from '../api';
import { contextBridge, ipcRenderer } from 'electron';
// import { user } from './constants';

const api: IElectronAPI = {
    getClientTxt: () => ipcRenderer.invoke('getClientTXT', undefined),
    serializeCookies: () => ipcRenderer.invoke('serializeCookies'),
    deleteClientTxt: () => ipcRenderer.invoke('deleteClientTXT'),
    getFile: filePath => ipcRenderer.invoke('getFile', { filePath }),
    deleteFile: filePath => ipcRenderer.invoke('deleteFile', { filePath }),
    saveFile: (filePath, data) =>
        ipcRenderer.invoke('saveFile', { filePath, data }),
    fs: (key, args) => ipcRenderer.invoke('fs', { key, args }),
};
contextBridge.exposeInMainWorld('electron', api);
