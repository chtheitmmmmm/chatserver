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
exports.HandleLoginSuccess = exports.EmitLoginSuccess = exports.HandleWriteDbSuccess = exports.EmitWriteDbSucess = void 0;
var events_1 = require("events");
var SucEmitter = new events_1.EventEmitter();
function EmitSuc(suc) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    SucEmitter.emit.apply(SucEmitter, __spreadArray([suc], args, false));
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