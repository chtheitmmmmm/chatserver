import {sockets} from "./init";
import {socketOid} from "./suc";
import {EmitIdActiveError} from "./err";
import {login} from "./write_db";
import {preChekck, SystemMsg, SystemBroadcast} from "./msg";
import {EmitBroadcast} from "./com";
import {Socket} from "net"

function preHandle(socket: Socket, thisSocket: socketOid){
    if(!preChekck()){
        // todo: deny connection
        return
    }
    SystemMsg(socket, "请输入你的id")
}

function handleData(socket: Socket, thisSocket: socketOid) {
    return function(data) {
        data = data.toString()
        if (data.trim() === '') {
            // 如果为空消息
            return
        }
        if (!thisSocket.id) {
            data = data.trim()
            if (sockets.find((s) => {
                return s.id === data
            })) {
                EmitIdActiveError(data, socket)
            } else {
                login(data.trim(), thisSocket);
            }
        } else {
            EmitBroadcast(thisSocket, `${thisSocket.id}: ${data}`)
        }
    }
}

function handleClose(socket: Socket, thisSocket: socketOid){
    return function() {
        if(thisSocket) {
            SystemBroadcast(thisSocket, `${thisSocket.id} 离开本聊天室`)
            socket.write(`再见！${thisSocket.id}\n`)
            sockets.splice(sockets.indexOf(thisSocket), 1)
        }else{
            socket.end("再见！\n")
        }
    }
}

function serve(socket) {
    let thisSocket : socketOid = {
        socket: socket,
        id: ''
    }
    preHandle(socket, thisSocket)
    socket.on('data', handleData(socket, thisSocket))
    socket.on('close', handleClose(socket, thisSocket))
}

export {
    serve
}