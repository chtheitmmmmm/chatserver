import {readFileSync} from "fs";
const commentjson = require('comment-json')

const configPath = "project.config.json"
let config;


config = commentjson.parse(readFileSync(configPath, 'utf-8'), null, true).valueOf()


const {dbpath, encoding, port} = config

export{
    dbpath,
    encoding,
    port
}



