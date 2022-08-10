import {EventEmitter} from "events";
import {socketOid, Err} from "./types";

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

function EmitIdNotFoundError(id:string, socket){
    EmitErr('IdNotFound', id, socket)
}
function HandleIdNotFoundError(callback:(id: string, thisSocket: socketOid) => void){
    ErrEmitter.on("IdNotFound", callback)
}

function EmitIdActiveError(id: string, socket){
    EmitErr('IdActive', id, socket)
}
function HandleIdActiveError(callback:(id: string, socket: socketOid) => void){
    ErrEmitter.on("IdActive", callback)
}

function EmitMaxAccountsError(id: string, thisSocket: socketOid){
    EmitErr('MaxAccounts', id, thisSocket)
}
function HandleMaxAccountsError(callback:(id:string, thisSocket: socketOid) => void){
    ErrEmitter.on("MaxAccounts", callback)
}

export {
    // ID 不合法，当 用户注册 时可能出现的错误
    EmitIdNotLegal,
    HandleIdNotLegal,

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