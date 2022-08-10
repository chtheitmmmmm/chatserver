// todo: http server, web application implemented.
// todo: user data saved in sql(mysql not excepted)

import {port} from "./read_config";
import {serve} from "./serve";


const net = require('net')

net.createServer(serve).listen(port)