"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemBroadcast = exports.SystemMsg = exports.preChekck = exports.chatNow = void 0;
const com_1 = require("./com");
const read_config_1 = require("./read_config");
const init_1 = require("./init");
// precheck: 防止 DDos，对于数据加密工作目前暂不提供
function preChekck() {
    return init_1.sockets.length < read_config_1.maxConnection;
}
exports.preChekck = preChekck;
// chat now!
function chatNow(thisSocket) {
    const socket = thisSocket.socket;
    SystemMsg(socket, `目前共有${init_1.sockets.length}名用户在本聊天室中`);
    SystemMsg(socket, "现在你可以愉快聊天啦！");
    SystemMsg(socket, "如果不能输入中文，不是本系统问题，是输入法问题");
    SystemMsg(socket, "请文明聊天，遵纪守法");
    SystemBroadcast(thisSocket, `${thisSocket.id} 进入聊天室`);
}
exports.chatNow = chatNow;
// 系统广播
function SystemBroadcast(socket, msg) {
    (0, com_1.EmitBroadcast)(socket, `-- ${msg} --\n`);
}
exports.SystemBroadcast = SystemBroadcast;
// 系统消息
function SystemMsg(socket, msg) {
    socket.write(`-! ${msg}\n`, read_config_1.encoding);
}
exports.SystemMsg = SystemMsg;
//# sourceMappingURL=msg.js.map