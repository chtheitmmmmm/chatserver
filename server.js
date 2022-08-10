"use strict";
// todo: http server, web application implemented.
// todo: user data saved in sql(mysql not excepted)
Object.defineProperty(exports, "__esModule", { value: true });
const read_config_1 = require("./read_config");
const serve_1 = require("./serve");
const net = require('net');
net.createServer(serve_1.serve).listen(read_config_1.port);
//# sourceMappingURL=server.js.map