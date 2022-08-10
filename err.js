"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleMaxAccountsError = exports.EmitMaxAccountsError = exports.HandleIdActiveError = exports.EmitIdActiveError = exports.HandleIdNotFoundError = exports.EmitIdNotFoundError = exports.HandleIdNotLegal = exports.EmitIdNotLegal = void 0;
const events_1 = require("events");
const ErrEmitter = new events_1.EventEmitter();
function EmitErr(err, ...args) {
    ErrEmitter.emit(err, ...args);
}
function EmitError(...args) {
    EmitErr("Error", ...args);
}
function HandleError(callback) {
    ErrEmitter.on("Error", callback);
}
function EmitIdNotLegal(id, socket) {
    EmitErr('IdNotLegal', id, socket);
}
exports.EmitIdNotLegal = EmitIdNotLegal;
function HandleIdNotLegal(callback) {
    ErrEmitter.on("IdNotLegal", callback);
}
exports.HandleIdNotLegal = HandleIdNotLegal;
function EmitIdNotFoundError(id, socket) {
    EmitErr('IdNotFound', id, socket);
}
exports.EmitIdNotFoundError = EmitIdNotFoundError;
function HandleIdNotFoundError(callback) {
    ErrEmitter.on("IdNotFound", callback);
}
exports.HandleIdNotFoundError = HandleIdNotFoundError;
function EmitIdActiveError(id, socket) {
    EmitErr('IdActive', id, socket);
}
exports.EmitIdActiveError = EmitIdActiveError;
function HandleIdActiveError(callback) {
    ErrEmitter.on("IdActive", callback);
}
exports.HandleIdActiveError = HandleIdActiveError;
function EmitMaxAccountsError(id, thisSocket) {
    EmitErr('MaxAccounts', id, thisSocket);
}
exports.EmitMaxAccountsError = EmitMaxAccountsError;
function HandleMaxAccountsError(callback) {
    ErrEmitter.on("MaxAccounts", callback);
}
exports.HandleMaxAccountsError = HandleMaxAccountsError;
//# sourceMappingURL=err.js.map