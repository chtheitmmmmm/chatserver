import {EventEmitter} from "events";
import {socketOid} from "./suc";

type CommonEvent = 'broadcast';
const CommonEmitter = new EventEmitter()

function EmitCommon(eve: CommonEvent, ...args: any[]){
    CommonEmitter.emit(eve, ...args)
}

function EmitBroadcast(thisSocket: socketOid, msg: string){
    EmitCommon('broadcast', thisSocket, msg)
}
function HandleBroadcast(callback: (thisSocket: socketOid, msg: string) => void){
    CommonEmitter.on('broadcast', callback)
}

export {
    // 广播事件，除发送者之外都要回显消息
    EmitBroadcast,
    HandleBroadcast,
}