import {HandleIdNotLegal, HandleIdNotFoundError, EmitIdActiveError, HandleIdActiveError} from "./err";
import {login} from "./write_db";
import {HandleLoginSuccess, HandleWriteDbSuccess} from "./suc";
import {write_db} from "./write_db";
import {encoding, port} from "./read_config";
import {Socket} from "net";
const net = require('net')

type socketOid = {
    socket: Socket,
    id: string
}
const sockets : Array<socketOid> = [];

function broadcast(socket: socketOid, msg: string){
    sockets.forEach(value => {
        if(socket.socket !== value.socket){
            value.socket.write(`${socket.id}: ${msg}`, encoding)
        }
    })
}

HandleIdNotLegal((id, socket) => {
    socket.write("您输入的id不合法（3个及以上10个及以下纯阿拉伯数字字符）\n", encoding)
})
HandleIdActiveError((id, socket) => {
    socket.write(`${id}正在聊天室中！\n`, encoding)
})
HandleIdNotFoundError((id, socket) => {
    write_db(id, socket)
})

net.createServer(socket => {
    socket.write("请输入你的id\n", encoding)
    let thisSocket : socketOid = null
    {// 初始化事件处理器
        HandleLoginSuccess((id, soc) => {
            if (soc === socket) {
                socket.write(`欢迎回来！${id}\n`, encoding)
                thisSocket.socket = socket
                thisSocket.id = id
                sockets.push(thisSocket)
            }
        })
        HandleWriteDbSuccess((p, id, soc) => {
            if (soc === socket) {
                socket.write(`新id，已为您注册${id}\n`, encoding)
                sockets.push(thisSocket = {
                    socket,
                    id
                })
            }
        })
    }
    socket.on('data', data => {
        data = data.toString()
        if(!thisSocket){
            if(sockets.find((s) => {
                return s.id === data.trim()
            })){
                EmitIdActiveError(data.trim(), socket)
            }else {
                login(data.trim(), socket);
            }
        }else{
            broadcast(thisSocket, data)
        }
    })
    socket.on('close', () => {
        if(thisSocket) {
            broadcast(thisSocket, `${thisSocket.id} 将离开本聊天室\n`)
            socket.end(`再见！${thisSocket.id}\n`)
            sockets.splice(sockets.indexOf(socket), 1)
        }else{
            socket.end("再见！\n")
        }
    })
}).listen(port)