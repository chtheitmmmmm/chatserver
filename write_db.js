"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.read_db = exports.login = exports.write_db = void 0;
var fs = require('fs');
var err_1 = require("./err");
var suc_1 = require("./suc");
var read_config_1 = require("./read_config");
// 读出数据库
function read_db() {
    return fs.readFileSync(read_config_1.dbpath, read_config_1.encoding).split('\n');
}
exports.read_db = read_db;
// 写入数据库
function write_db(id, socket) {
    if (id.match(/^[0-9]{3,10}$/)) {
        var accounts = read_db();
        if (accounts.length >= read_config_1.maxAccounts) {
            // 防止sql泛洪
            (0, err_1.EmitMaxAccountsError)(id, socket);
        }
        else {
            if (!read_db().includes(id)) {
                fs.appendFileSync(read_config_1.dbpath, id + '\n', read_config_1.encoding); // 将id写入
                (0, suc_1.EmitWriteDbSucess)(read_config_1.dbpath, id, socket);
            }
            else {
                (0, err_1.EmitIdHaveExistsError)(id);
            }
        }
    }
    else {
        (0, err_1.EmitIdNotLegal)(id, socket);
    }
}
exports.write_db = write_db;
function login(id, socket) {
    if (read_db().includes(id)) {
        (0, suc_1.EmitLoginSuccess)(id, socket);
    }
    else {
        (0, err_1.EmitIdNotFoundError)(id, socket);
    }
}
exports.login = login;
//# sourceMappingURL=write_db.js.map