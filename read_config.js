"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxAccounts = exports.maxConnection = exports.port = exports.encoding = exports.dbpath = void 0;
var fs_1 = require("fs");
var commentjson = require('comment-json');
var configPath = "project.config.json";
var config;
config = commentjson.parse((0, fs_1.readFileSync)(configPath, 'utf-8'), null, true).valueOf();
var dbpath = config.dbpath, encoding = config.encoding, port = config.port, maxConnection = config.maxConnection, maxAccounts = config.maxAccounts;
exports.dbpath = dbpath;
exports.encoding = encoding;
exports.port = port;
exports.maxConnection = maxConnection;
exports.maxAccounts = maxAccounts;
//# sourceMappingURL=read_config.js.map