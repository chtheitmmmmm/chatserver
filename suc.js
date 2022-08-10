"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleLoginSuccess = exports.EmitLoginSuccess = exports.HandleWriteDbSuccess = exports.EmitWriteDbSucess = void 0;
const events_1 = require("events");
const SucEmitter = new events_1.EventEmitter();
function EmitSuc(suc, ...args) {
    SucEmitter.emit(suc, ...args);
}
function EmitWriteDbSucess(filePath, id, socket) {
    EmitSuc('WriteDbSuccess', filePath, id, socket);
}
exports.EmitWriteDbSucess = EmitWriteDbSucess;
function HandleWriteDbSuccess(callback) {
    SucEmitter.on("WriteDbSuccess", callback);
}
exports.HandleWriteDbSuccess = HandleWriteDbSuccess;
function EmitLoginSuccess(id, socket) {
    EmitSuc("LoginSuccess", id, socket);
}
exports.EmitLoginSuccess = EmitLoginSuccess;
function HandleLoginSuccess(callback) {
    SucEmitter.on("LoginSuccess", callback);
}
exports.HandleLoginSuccess = HandleLoginSuccess;
//# sourceMappingURL=suc.js.map