import {socketOid} from "./suc";
import {EmitBroadcast} from "./com";
import {Socket} from "net";
import {encoding, maxConnection} from "./read_config";
import {sockets} from "./init";

// precheck: 防止 DDos，对于数据加密工作目前暂不提供
function preChekck() :Boolean {
    return sockets.length < maxConnection;
}

// chat now!
function chatNow(thisSocket: socketOid) {
    const socket = thisSocket.socket
    SystemBroadcast(thisSocket, `${thisSocket.id} 进入聊天室`)
    SystemMsg(socket, `目前共有${sockets.length}名用户在本聊天室中`)
    SystemMsg(socket, "现在你可以愉快聊天啦！")
    SystemMsg(socket, "如果不能输入中文，不是本系统问题，是输入法问题")
    SystemMsg(socket, "请文明聊天，遵纪守法")
}

// 系统广播
function SystemBroadcast(socket:socketOid, msg:string){
    EmitBroadcast(socket, `-- ${msg} --\n`)
}

// 系统消息
function SystemMsg(socket:Socket, msg:string){
    socket.write(`-! ${msg}\n`, encoding)
}

export {
    chatNow,
    preChekck,
    SystemMsg,
    SystemBroadcast
}