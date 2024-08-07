import type fs from 'fs';

type FunctionKeys<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export type IElectronAPI = {
    getClientTxt: () => Promise<string>;
    deleteClientTxt: (filePath: string) => void;
    serializeCookies: () => void;
    deleteFile: (filePath: string) => void;
    getFile: (filePath: string) => Promise<string>;
    saveFile: (filePath: string, data: string) => Promise<void>;
    fs: <T extends FunctionKeys<typeof fs>>(
        key: T,
        args: Parameters<(typeof fs)[T]>
    ) => ReturnType<(typeof fs)[T]>;
};

declare global {
    interface Window {
        electron: IElectronAPI;
    }
}
