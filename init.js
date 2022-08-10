"use strict";
/**
 * init handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sockets = void 0;
const suc_1 = require("./suc");
const err_1 = require("./err");
const write_db_1 = require("./write_db");
const msg_1 = require("./msg");
const com_1 = require("./com");
let C;
//# tsignore
const chalk = import('chalk').then((module) => {
    C = new module.Chalk();
});
exports.sockets = [];
(0, err_1.HandleIdNotLegal)((id, socket) => {
    (0, msg_1.SystemMsg)(socket, "您输入的id不合法（3个及以上10个及以下纯阿拉伯数字字符）");
});
(0, err_1.HandleIdActiveError)((id, thisSocket) => {
    (0, msg_1.SystemMsg)(thisSocket.socket, `${id}正在聊天室中！\n`);
});
(0, err_1.HandleIdNotFoundError)((id, thisSocket) => {
    (0, write_db_1.write_db)(id, thisSocket);
});
(0, err_1.HandleMaxAccountsError)((id, thisSocket) => {
    (0, msg_1.SystemMsg)(thisSocket.socket, '注册账号数目已满，请联系cmtheit@outlook.com！');
});
(0, suc_1.HandleLoginSuccess)((id, thisSocket) => {
    (0, msg_1.SystemMsg)(thisSocket.socket, `欢迎回来！${id}`);
    Object.assign(thisSocket, {
        id
    });
    exports.sockets.push(thisSocket);
    (0, msg_1.chatNow)(thisSocket);
});
(0, suc_1.HandleWriteDbSuccess)((p, id, thisSocket) => {
    const socket = thisSocket.socket;
    (0, msg_1.SystemMsg)(socket, `新id，已为您注册${id}`);
    Object.assign(thisSocket, {
        id
    });
    exports.sockets.push(thisSocket);
    (0, msg_1.chatNow)(thisSocket);
});
(0, com_1.HandleBroadcast)((thisSocket, msg) => {
    thisSocket.socket.write(C.green(msg));
    exports.sockets.forEach((thesoc) => {
        if (thesoc.id != thisSocket.id) {
            thesoc.socket.write(C.blue(msg));
        }
    });
});
//# sourceMappingURL=init.js.map