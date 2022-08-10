import {Socket} from "net";

type Suc = "Success" | "WriteDbSuccess" | "LoginSuccess";
type Err = 'Error' | 'FileOpenError' | 'IdNotLegal' | "IdHaveExists" | "IdNotFound" | "IdActive" | "MaxAccounts";

type socketOid = {
    socket: Socket,
    id: string
}

export {
    Suc,
    Err,
    socketOid
}