"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleMaxAccountsError = exports.EmitMaxAccountsError = exports.HandleIdActiveError = exports.EmitIdActiveError = exports.HandleIdNotFoundError = exports.EmitIdNotFoundError = exports.HandleIdHaveExistsError = exports.EmitIdHaveExistsError = exports.HandleFileOpenError = exports.EmitFileOpenError = exports.HandleIdNotLegal = exports.EmitIdNotLegal = void 0;
var events_1 = require("events");
var ErrEmitter = new events_1.EventEmitter();
function EmitErr(err) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    ErrEmitter.emit.apply(ErrEmitter, __spreadArray([err], args, false));
}
function EmitError() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    EmitErr.apply(void 0, __spreadArray(["Error"], args, false));
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
function EmitFileOpenError() {
    EmitErr("FileOpenError");
}
exports.EmitFileOpenError = EmitFileOpenError;
function HandleFileOpenError(callback) {
    ErrEmitter.on("FileOpenError", callback);
}
exports.HandleFileOpenError = HandleFileOpenError;
function EmitIdHaveExistsError(id) {
    EmitErr("FileOpenError", id);
}
exports.EmitIdHaveExistsError = EmitIdHaveExistsError;
function HandleIdHaveExistsError(callback) {
    ErrEmitter.on("IdHaveExists", callback);
}
exports.HandleIdHaveExistsError = HandleIdHaveExistsError;
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
function EmitMaxAccountsError(id, socket) {
    EmitErr('MaxAccounts', id, socket);
}
exports.EmitMaxAccountsError = EmitMaxAccountsError;
function HandleMaxAccountsError(callback) {
    ErrEmitter.on("MaxAccounts", callback);
}
exports.HandleMaxAccountsError = HandleMaxAccountsError;
//# sourceMappingURL=err.js.map