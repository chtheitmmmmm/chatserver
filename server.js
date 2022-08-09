"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var err_1 = require("./err");
var write_db_1 = require("./write_db");
var suc_1 = require("./suc");
var read_config_1 = require("./read_config");
var net = require('net');
var sockets = [];
// 发送消息
function broadcast(socket, msg) {
    sockets.forEach(function (value) {
        if (socket.socket !== value.socket) {
            value.socket.write(msg, read_config_1.encoding);
        }
    });
}
// 系统广播
function SystemBroadcast(socket, msg) {
    broadcast(socket, "-- ".concat(msg, " --\n"));
}
// 系统消息
function SystemMsg(socket, msg) {
    socket.write("-! ".concat(msg, "\n"), read_config_1.encoding);
}
// precheck: 防止 DDos，对于数据加密工作目前暂不提供
function preChekck() {
    return sockets.length < read_config_1.maxConnection;
}
// chat now!
function chatNow(socket, thisSocket) {
    SystemBroadcast(thisSocket, "".concat(thisSocket.id, " \u8FDB\u5165\u804A\u5929\u5BA4"));
    SystemMsg(socket, "\u76EE\u524D\u5171\u6709".concat(sockets.length, "\u540D\u7528\u6237\u5728\u672C\u804A\u5929\u5BA4\u4E2D"));
    SystemMsg(socket, "现在你可以愉快聊天啦！");
    SystemMsg(socket, "如果不能输入中文，不是本系统问题，是输入法问题");
    SystemMsg(socket, "请文明聊天，遵纪守法");
}
(0, err_1.HandleIdNotLegal)(function (id, socket) {
    SystemMsg(socket, "您输入的id不合法（3个及以上10个及以下纯阿拉伯数字字符）");
});
(0, err_1.HandleIdActiveError)(function (id, socket) {
    SystemMsg(socket, "".concat(id, "\u6B63\u5728\u804A\u5929\u5BA4\u4E2D\uFF01\n"));
});
(0, err_1.HandleIdNotFoundError)(function (id, socket) {
    (0, write_db_1.write_db)(id, socket);
});
(0, err_1.HandleMaxAccountsError)(function (id, socket) {
    SystemMsg(socket, '注册账号数目已满，请联系cmtheit@outlook.com！');
});
net.createServer(function (socket) {
    if (!preChekck()) {
        return;
    }
    SystemMsg(socket, "请输入你的id");
    var thisSocket = null;
    { // 初始化事件处理器
        (0, suc_1.HandleLoginSuccess)(function (id, soc) {
            if (soc === socket) {
                SystemMsg(socket, "\u6B22\u8FCE\u56DE\u6765\uFF01".concat(id));
                sockets.push(thisSocket = {
                    socket: socket,
                    id: id
                });
                chatNow(socket, thisSocket);
            }
        });
        (0, suc_1.HandleWriteDbSuccess)(function (p, id, soc) {
            if (soc === socket) {
                SystemMsg(socket, "\u65B0id\uFF0C\u5DF2\u4E3A\u60A8\u6CE8\u518C".concat(id));
                sockets.push(thisSocket = {
                    socket: socket,
                    id: id
                });
                chatNow(socket, thisSocket);
            }
        });
    }
    socket.on('data', function (data) {
        data = data.toString();
        if (data.trim() === '') {
            // 如果为空消息
            return;
        }
        if (!thisSocket) {
            data = data.trim();
            if (sockets.find(function (s) {
                return s.id === data;
            })) {
                (0, err_1.EmitIdActiveError)(data, socket);
            }
            else {
                (0, write_db_1.login)(data.trim(), socket);
            }
        }
        else {
            broadcast(thisSocket, "".concat(thisSocket.id, ": ").concat(data));
        }
    });
    socket.on('close', function () {
        if (thisSocket) {
            SystemBroadcast(thisSocket, "".concat(thisSocket.id, " \u79BB\u5F00\u672C\u804A\u5929\u5BA4"));
            socket.end("\u518D\u89C1\uFF01".concat(thisSocket.id, "\n"));
            sockets.splice(sockets.indexOf(thisSocket), 1);
        }
        else {
            socket.end("再见！\n");
        }
    });
}).listen(read_config_1.port);
//# sourceMappingURL=server.js.map