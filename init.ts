/**
 * init handler
 */

import {HandleLoginSuccess, HandleWriteDbSuccess, socketOid} from "./suc";
import {HandleIdActiveError, HandleIdNotFoundError, HandleIdNotLegal, HandleMaxAccountsError} from "./err";
import {write_db} from "./write_db";
import {SystemMsg, chatNow} from "./msg";
import {HandleBroadcast} from "./com";
let C;
//# tsignore
const chalk = import('chalk').then((module) => {
    C = new module.Chalk()
})


export const sockets : Array<socketOid> = [];


HandleIdNotLegal((id, socket) => {
    SystemMsg(socket, "您输入的id不合法（3个及以上10个及以下纯阿拉伯数字字符）")
})
HandleIdActiveError((id, thisSocket) => {
    SystemMsg(thisSocket.socket, `${id}正在聊天室中！\n`)
})
HandleIdNotFoundError((id, thisSocket) => {
    write_db(id, thisSocket)
})
HandleMaxAccountsError((id, thisSocket) => {
    SystemMsg(thisSocket.socket, '注册账号数目已满，请联系cmtheit@outlook.com！')
})
HandleLoginSuccess((id, thisSocket) => {
    SystemMsg(thisSocket.socket, `欢迎回来！${id}`)
    Object.assign(thisSocket, {
        id
    })
    sockets.push(thisSocket)
    chatNow(thisSocket)
})
HandleWriteDbSuccess((p, id,thisSocket) => {
    const socket = thisSocket.socket
    SystemMsg(socket, `新id，已为您注册${id}`)
    Object.assign(thisSocket, {
        id
    })
    sockets.push(thisSocket)
    chatNow(thisSocket)
})
HandleBroadcast((thisSocket, msg) => {
    thisSocket.socket.write(C.green(msg))
    sockets.forEach((thesoc) => {
        if (thesoc.id != thisSocket.id){
            thesoc.socket.write(C.blue(msg))
        }
    })
})
