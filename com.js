"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleBroadcast = exports.EmitBroadcast = void 0;
const events_1 = require("events");
const CommonEmitter = new events_1.EventEmitter();
function EmitCommon(eve, ...args) {
    CommonEmitter.emit(eve, ...args);
}
function EmitBroadcast(thisSocket, msg) {
    EmitCommon('broadcast', thisSocket, msg);
}
exports.EmitBroadcast = EmitBroadcast;
function HandleBroadcast(callback) {
    CommonEmitter.on('broadcast', callback);
}
exports.HandleBroadcast = HandleBroadcast;
//# sourceMappingURL=com.js.map