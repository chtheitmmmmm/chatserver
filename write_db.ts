const fs = require('fs')
import {EmitIdNotLegal, EmitIdNotFoundError, EmitMaxAccountsError} from "./err";
import {EmitWriteDbSucess, EmitLoginSuccess} from "./suc"
import {dbpath, encoding, maxAccounts} from "./read_config";
import {socketOid} from "./suc";

// 读出数据库
function read_db() : Array<string> | undefined{
    return fs.readFileSync(dbpath, encoding).split('\n')

}

// 写入数据库
function write_db(id: string, theSocket: socketOid){
    if(id.match(/^[0-9]{3,10}$/)){
        const accounts = read_db()
        if (accounts.length >= maxAccounts){
            // 防止sql泛洪
            EmitMaxAccountsError(id, theSocket)
        }else {
            // id 一定没有注册
            fs.appendFileSync(dbpath, id + '\n', encoding) // 将id写入
            EmitWriteDbSucess(dbpath, id, theSocket)
        }
    }else{
        EmitIdNotLegal(id, theSocket)
    }
}

function login(id: string, theSocket: socketOid){
    if (read_db().includes(id)){
        EmitLoginSuccess(id, theSocket)
    }else{
        EmitIdNotFoundError(id, theSocket)
    }
}

export {
    write_db,
    login,
    read_db
}