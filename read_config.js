"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxAccounts = exports.maxConnection = exports.port = exports.encoding = exports.dbpath = void 0;
const fs_1 = require("fs");
const commentjson = require('comment-json');
const configPath = "project.config.json";
let config;
config = commentjson.parse((0, fs_1.readFileSync)(configPath, 'utf-8'), null, true).valueOf();
const { dbpath, encoding, port, maxConnection, maxAccounts } = config;
exports.dbpath = dbpath;
exports.encoding = encoding;
exports.port = port;
exports.maxConnection = maxConnection;
exports.maxAccounts = maxAccounts;
//# sourceMappingURL=read_config.js.map