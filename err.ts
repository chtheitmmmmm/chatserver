import {EventEmitter} from "events";

type Err = 'Error' | 'FileOpenError' | 'IdNotLegal' | "IdHaveExists" | "IdNotFound" | "IdActive" | "MaxAccounts";

const ErrEmitter = new EventEmitter()

function EmitErr(err: Err, ...args: any){
    ErrEmitter.emit(err, ...args)
}

function EmitError(...args: any){
    EmitErr("Error", ...args)
}
function HandleError(callback: (...args:any[]) => void){
    ErrEmitter.on("Error", callback)
}

function EmitIdNotLegal(id: string, socket){
    EmitErr('IdNotLegal', id, socket)
}
function HandleIdNotLegal(callback: (string, socket) => void){
    ErrEmitter.on("IdNotLegal", callback)
}

function EmitFileOpenError(){
    EmitErr("FileOpenError")
}
function HandleFileOpenError(callback:() => void){
    ErrEmitter.on("FileOpenError", callback)
}

function EmitIdHaveExistsError(id:string){
    EmitErr("FileOpenError", id)
}
function HandleIdHaveExistsError(callback:(id:string) => void){
    ErrEmitter.on("IdHaveExists", callback)
}

function EmitIdNotFoundError(id:string, socket){
    EmitErr('IdNotFound', id, socket)
}
function HandleIdNotFoundError(callback:(id:string, socket) => void){
    ErrEmitter.on("IdNotFound", callback)
}

function EmitIdActiveError(id: string, socket){
    EmitErr('IdActive', id, socket)
}
function HandleIdActiveError(callback:(id:string, socket) => void){
    ErrEmitter.on("IdActive", callback)
}

function EmitMaxAccountsError(id: string, socket){
    EmitErr('MaxAccounts', id, socket)
}
function HandleMaxAccountsError(callback:(id:string, socket) => void){
    ErrEmitter.on("MaxAccounts", callback)
}

export {
    // ID 不合法，当 用户注册 时可能出现的错误
    EmitIdNotLegal,
    HandleIdNotLegal,

    // 文件打开错误，当 服务器启动、用户注册、用户登陆 时可能出现的错误
    EmitFileOpenError,
    HandleFileOpenError,

    // Id 已存在，当 用户注册 时可能出现的错误
    EmitIdHaveExistsError,
    HandleIdHaveExistsError,

    // Id 未找到，当 用户登陆 时可能出现的错误
    EmitIdNotFoundError,
    HandleIdNotFoundError,

    // Id正在聊天室，当 用户登陆 时可能出现的错误
    EmitIdActiveError,
    HandleIdActiveError,

    // 最大账号数目，当 用户登陆 时可能出现的错误
    EmitMaxAccountsError,
    HandleMaxAccountsError,
}