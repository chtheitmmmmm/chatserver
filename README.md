# chatServer
A little chat server developed upon Nodejs and TypeScript

## description
This is a simple instance of chat server based on nodejs and typescript.
## how
<!--todo: finish this part.-->
Every visitor are supposed to give an legal id, which will identify he/she.

Then broadcast every textual message you want!
## usage
### start
To start the server, type:
```shell
npm start
```
### config
Open `project.config.json' to configuration.

Don't be overwhelming about the IDE's error storm of the below comments in JSON.
```json
// Please save this file in utf-8 encoding, or do not type Chinese or other unicode charctor.
// All config is shown in this path, and none of them can be omitted.
{
  // the database path, prefix '/' (or '\' on Windows) is allowed, otherwise you shoud give it relative path
  "dbpath": "zhanghao.txt",
  // the encoding of iostream
  "encoding": "utf-8",
  // port to listen
  "port": 12000,
  // Max connection
  "maxConnection": 25,
  // Max number of accounts
  "maxAccounts": 1000
}
```

## npm
You can type
```shell
npm install chatserverexam
```
to download this package

## site
type
```shell
telnet cmtheit.com 12000
```
to join a deployed instance!