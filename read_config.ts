import {readFileSync} from "fs";
const commentjson = require('comment-json')

const configPath = "/Users/chengmin/code/WebstormProjects/nodestrom/chatserver/project.confjg.json"
let config;


config = commentjson.parse(readFileSync(configPath, 'utf-8'), null, true).valueOf()


const {dbpath, encoding, port} = config

export{
    dbpath,
    encoding,
    port
}



