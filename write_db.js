"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.read_db = exports.login = exports.write_db = void 0;
const fs = require('fs');
const err_1 = require("./err");
const suc_1 = require("./suc");
const read_config_1 = require("./read_config");
// 读出数据库
function read_db() {
    return fs.readFileSync(read_config_1.dbpath, read_config_1.encoding).split('\n');
}
exports.read_db = read_db;
// 写入数据库
function write_db(id, theSocket) {
    if (id.match(/^[0-9]{3,10}$/)) {
        const accounts = read_db();
        if (accounts.length >= read_config_1.maxAccounts) {
            // 防止sql泛洪
            (0, err_1.EmitMaxAccountsError)(id, theSocket);
        }
        else {
            // id 一定没有注册
            fs.appendFileSync(read_config_1.dbpath, id + '\n', read_config_1.encoding); // 将id写入
            (0, suc_1.EmitWriteDbSucess)(read_config_1.dbpath, id, theSocket);
        }
    }
    else {
        (0, err_1.EmitIdNotLegal)(id, theSocket);
    }
}
exports.write_db = write_db;
function login(id, theSocket) {
    if (read_db().includes(id)) {
        (0, suc_1.EmitLoginSuccess)(id, theSocket);
    }
    else {
        (0, err_1.EmitIdNotFoundError)(id, theSocket);
    }
}
exports.login = login;
//# sourceMappingURL=write_db.js.map