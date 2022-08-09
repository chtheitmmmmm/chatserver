import {
    HandleIdNotLegal,
    HandleIdNotFoundError,
    EmitIdActiveError,
    HandleIdActiveError,
    HandleMaxAccountsError
} from "./err";
import {login, write_db, read_db} from "./write_db";
import {HandleLoginSuccess, HandleWriteDbSuccess} from "./suc";
import {encoding, port, maxConnection, maxAccounts} from "./read_config";
import {Socket} from "net";
const net = require('net')

type socketOid = {
    socket: Socket,
    id: string
}
const sockets : Array<socketOid> = [];

// 发送消息
function broadcast(socket: socketOid, msg: string){
    sockets.forEach(value => {
        if(socket.socket !== value.socket){
            value.socket.write(msg, encoding)
        }
    })
}

// 系统广播
function SystemBroadcast(socket:socketOid, msg:string){
    broadcast(socket, `-- ${msg} --\n`)
}

// 系统消息
function SystemMsg(socket:Socket, msg:string){
    socket.write(`-! ${msg}\n`, encoding)
}

// precheck: 防止 DDos，对于数据加密工作目前暂不提供
function preChekck() :Boolean {
    return sockets.length < maxConnection;
}

// chat now!
function chatNow(socket: Socket, thisSocket: socketOid) {
    SystemBroadcast(thisSocket, `${thisSocket.id} 进入聊天室`)
    SystemMsg(socket, `目前共有${sockets.length}名用户在本聊天室中`)
    SystemMsg(socket, "现在你可以愉快聊天啦！")
    SystemMsg(socket, "如果不能输入中文，不是本系统问题，是输入法问题")
    SystemMsg(socket, "请文明聊天，遵纪守法")
}

HandleIdNotLegal((id, socket) => {
    SystemMsg(socket, "您输入的id不合法（3个及以上10个及以下纯阿拉伯数字字符）")
})
HandleIdActiveError((id, socket) => {
    SystemMsg(socket, `${id}正在聊天室中！\n`)
})
HandleIdNotFoundError((id, socket) => {
    write_db(id, socket)
})
HandleMaxAccountsError((id, socket) => {
    SystemMsg(socket, '注册账号数目已满，请联系cmtheit@outlook.com！')
})

net.createServer(socket => {
    if(!preChekck()){
        return
    }
    SystemMsg(socket, "请输入你的id")
    let thisSocket : socketOid = null
    {// 初始化事件处理器
        HandleLoginSuccess((id, soc) => {
            if (soc === socket) {
                SystemMsg(socket, `欢迎回来！${id}`)
                sockets.push(thisSocket = {
                    socket,
                    id
                })
                chatNow(socket, thisSocket)
            }
        })
        HandleWriteDbSuccess((p, id, soc) => {
            if (soc === socket) {
                SystemMsg(socket, `新id，已为您注册${id}`)
                sockets.push(thisSocket = {
                    socket,
                    id
                })
                chatNow(socket, thisSocket)
            }
        })
    }
    socket.on('data', data => {
        data = data.toString()
        if(data.trim() === ''){
            // 如果为空消息
            return
        }
        if(!thisSocket){
            data = data.trim()
            if(sockets.find((s) => {
                return s.id === data
            })){
                EmitIdActiveError(data, socket)
            }else {
                login(data.trim(), socket);
            }
        }else{
            broadcast(thisSocket, `${thisSocket.id}: ${data}`)
        }
    })
    socket.on('close', () => {
        if(thisSocket) {
            SystemBroadcast(thisSocket, `${thisSocket.id} 离开本聊天室`)
            socket.end(`再见！${thisSocket.id}\n`)
            sockets.splice(sockets.indexOf(thisSocket), 1)
        }else{
            socket.end("再见！\n")
        }
    })
}).listen(port)