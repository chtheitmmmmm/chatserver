const fs = require('fs')
import {EmitIdNotLegal, EmitIdNotFoundError, EmitIdHaveExistsError, EmitMaxAccountsError} from "./err";
import {EmitWriteDbSucess, EmitLoginSuccess} from "./suc"
import {dbpath, encoding, maxAccounts} from "./read_config";


// 读出数据库
function read_db() : Array<string> | undefined{
    return fs.readFileSync(dbpath, encoding).split('\n')

}

// 写入数据库
function write_db(id: string, socket){
    if(id.match(/^[0-9]{3,10}$/)){
        const accounts = read_db()
        if (accounts.length >= maxAccounts){
            // 防止sql泛洪
            EmitMaxAccountsError(id, socket)
        }else {
            if (!read_db().includes(id)) {
                fs.appendFileSync(dbpath, id + '\n', encoding) // 将id写入
                EmitWriteDbSucess(dbpath, id, socket)
            } else {
                EmitIdHaveExistsError(id)
            }
        }
    }else{
        EmitIdNotLegal(id, socket)
    }
}

function login(id: string, socket){
    if (read_db().includes(id)){
        EmitLoginSuccess(id, socket)
    }else{
        EmitIdNotFoundError(id, socket)
    }
}

export {
    write_db,
    login,
    read_db
}