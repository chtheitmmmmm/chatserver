"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var err_1 = require("./err");
var write_db_1 = require("./write_db");
var suc_1 = require("./suc");
var write_db_2 = require("./write_db");
var read_config_1 = require("./read_config");
var net = require('net');
var sockets = [];
function broadcast(socket, msg) {
    sockets.forEach(function (value) {
        if (socket.socket !== value.socket) {
            value.socket.write("".concat(socket.id, ": ").concat(msg), read_config_1.encoding);
        }
    });
}
(0, err_1.HandleIdNotLegal)(function (id, socket) {
    socket.write("您输入的id不合法（3个及以上10个及以下纯阿拉伯数字字符）\n", read_config_1.encoding);
});
(0, err_1.HandleIdActiveError)(function (id, socket) {
    socket.write("".concat(id, "\u6B63\u5728\u804A\u5929\u5BA4\u4E2D\uFF01\n"), read_config_1.encoding);
});
(0, err_1.HandleIdNotFoundError)(function (id, socket) {
    (0, write_db_2.write_db)(id, socket);
});
net.createServer(function (socket) {
    socket.write("请输入你的id\n", read_config_1.encoding);
    var thisSocket = null;
    { // 初始化事件处理器
        (0, suc_1.HandleLoginSuccess)(function (id, soc) {
            if (soc === socket) {
                socket.write("\u6B22\u8FCE\u56DE\u6765\uFF01".concat(id, "\n"), read_config_1.encoding);
                thisSocket.socket = socket;
                thisSocket.id = id;
                sockets.push(thisSocket);
            }
        });
        (0, suc_1.HandleWriteDbSuccess)(function (p, id, soc) {
            if (soc === socket) {
                socket.write("\u65B0id\uFF0C\u5DF2\u4E3A\u60A8\u6CE8\u518C".concat(id, "\n"), read_config_1.encoding);
                sockets.push(thisSocket = {
                    socket: socket,
                    id: id
                });
            }
        });
    }
    socket.on('data', function (data) {
        data = data.toString();
        if (!thisSocket) {
            if (sockets.find(function (s) {
                return s.id === data.trim();
            })) {
                (0, err_1.EmitIdActiveError)(data.trim(), socket);
            }
            else {
                (0, write_db_1.login)(data.trim(), socket);
            }
        }
        else {
            broadcast(thisSocket, data);
        }
    });
    socket.on('close', function () {
        if (thisSocket) {
            broadcast(thisSocket, "".concat(thisSocket.id, " \u5C06\u79BB\u5F00\u672C\u804A\u5929\u5BA4\n"));
            socket.end("\u518D\u89C1\uFF01".concat(thisSocket.id, "\n"));
            sockets.splice(sockets.indexOf(socket), 1);
        }
        else {
            socket.end("再见！\n");
        }
    });
}).listen(read_config_1.port);
//# sourceMappingURL=server.js.map