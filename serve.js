"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const init_1 = require("./init");
const err_1 = require("./err");
const write_db_1 = require("./write_db");
const msg_1 = require("./msg");
const com_1 = require("./com");
function preHandle(socket, thisSocket) {
    if (!(0, msg_1.preChekck)()) {
        // todo: deny connection
        return;
    }
    (0, msg_1.SystemMsg)(socket, "请输入你的id");
}
function handleData(socket, thisSocket) {
    return function (data) {
        data = data.toString();
        if (data.trim() === '') {
            // 如果为空消息
            return;
        }
        if (!thisSocket.id) {
            data = data.trim();
            if (init_1.sockets.find((s) => {
                return s.id === data;
            })) {
                (0, err_1.EmitIdActiveError)(data, socket);
            }
            else {
                (0, write_db_1.login)(data.trim(), thisSocket);
            }
        }
        else {
            (0, com_1.EmitBroadcast)(thisSocket, `${thisSocket.id}: ${data}`);
        }
    };
}
function handleClose(socket, thisSocket) {
    return function () {
        if (thisSocket) {
            (0, msg_1.SystemBroadcast)(thisSocket, `${thisSocket.id} 离开本聊天室`);
            socket.end(`再见！${thisSocket.id}\n`);
            init_1.sockets.splice(init_1.sockets.indexOf(thisSocket), 1);
        }
        else {
            socket.end("再见！\n");
        }
    };
}
function serve(socket) {
    let thisSocket = {
        socket: socket,
        id: ''
    };
    preHandle(socket, thisSocket);
    socket.on('data', handleData(socket, thisSocket));
    socket.on('close', handleClose(socket, thisSocket));
}
exports.serve = serve;
//# sourceMappingURL=serve.js.map