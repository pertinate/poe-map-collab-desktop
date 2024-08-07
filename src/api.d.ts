import { Maps } from './server/map';

export interface AboutMenuAction {
    action: 'about';
}

export interface HelpMenuAction {
    action: 'help';
}

export type AppAction = AboutMenuAction | HelpMenuAction;

export type IpcRequest = {
    body: any;
    headers: any;
    method: string;
    url: string;
};

export type IpcResponse = {
    body: any;
    headers: any;
    status: number;
};

export type IElectronAPI = {
    node: () => string;
    chrome: () => string;
    electron: () => string;
    getClientTxt: () => Promise<string>;
    receive: (channel: 'app', func: (event: AppAction) => void) => void;
    trpc: (req: IpcRequest) => Promise<IpcResponse>;
};

declare global {
    interface Window {
        appApi: IElectronAPI;
    }
}
