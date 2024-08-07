import { CallbackKey, CallbackParams, CallbackReturn } from "electron/preload/callbacks"
import { useEffect, useState } from "react"
// import type { callbacksType } from '../../middleware/callbacks'

const useIpc = <T extends CallbackKey>(channel: T, data?: {
    query?: CallbackParams<T>,
    initialData?: CallbackReturn<T>
}) => {
    const [state, setState] = useState<CallbackReturn<T> | undefined>(data?.initialData)
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const sub = (event: Electron.IpcRendererEvent, data: CallbackReturn<T>) => {
            setState(data)
            setLoading(false)
        }
        window.ipcRenderer.on(`${channel}-client`, sub);

        setLoading(true)

        window.ipcRenderer.send(`${channel}-server`, data?.query);

        return () => {
            window.ipcRenderer.off(`${channel}-client`, sub)
        }
    }, [])
    return {
        state,
        loading,
        send: (value: CallbackParams<T>) => {
            // console.log(window.ipc, channel, value)
            setLoading(true)
            window.ipcRenderer.send(`${channel}-server`, value as never);
        }
    }
}

export default useIpc