import {EventEmitter} from "events";

type Suc = "Success" | "WriteDbSuccess" | "LoginSuccess";

const SucEmitter = new EventEmitter()

function EmitSuc(suc: Suc, ...args){
    SucEmitter.emit(suc, ...args)
}

function EmitWriteDbSucess(filePath: string, id: string, socket){
    EmitSuc('WriteDbSuccess', filePath, id, socket)
}
function HandleWriteDbSuccess(callback:(path:string, id:string, socket) => void){
    SucEmitter.on("WriteDbSuccess", callback)
}

function EmitLoginSuccess(id:string, socket){
    EmitSuc("LoginSuccess", id, socket)
}
function HandleLoginSuccess(callback: (id: string, socket, thisSocket) => void){
    SucEmitter.on("LoginSuccess", callback)
}

export {
    EmitWriteDbSucess,
    HandleWriteDbSuccess,
    EmitLoginSuccess,
    HandleLoginSuccess
}
