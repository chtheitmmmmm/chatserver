import {EventEmitter} from "events";
import {Suc, socketOid} from "./types";

const SucEmitter = new EventEmitter()

function EmitSuc(suc: Suc, ...args){
    SucEmitter.emit(suc, ...args)
}

function EmitWriteDbSucess(filePath: string, id: string, socket: socketOid){
    EmitSuc('WriteDbSuccess', filePath, id, socket)
}
function HandleWriteDbSuccess(callback:(path:string, id:string, socket: socketOid) => void){
    SucEmitter.on("WriteDbSuccess", callback)
}

function EmitLoginSuccess(id:string, socket){
    EmitSuc("LoginSuccess", id, socket)
}
function HandleLoginSuccess(callback: (id: string, thisSocket: socketOid) => void){
    SucEmitter.on("LoginSuccess", callback)
}

export {
    socketOid,
    EmitWriteDbSucess,
    HandleWriteDbSuccess,
    EmitLoginSuccess,
    HandleLoginSuccess
}
