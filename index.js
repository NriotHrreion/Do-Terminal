"use strict";

/**
 * Do Ternimal By NriotHrreion
 * 
 * (c) 2021 NriotHrreion
 */

const path = require("path");
const http = require("http");
const Logger = require("./util/logger");
const executors = require("./run/executor");
const DataStream = require("./run/data");
const Command = require("./run/command");

const keypress = require("keypress");
const express = require("express");
const WebSocket = require("ws");

var app = express();
app.use(express.static(path.join(__dirname, "static")));

var server = http.createServer(app);
var wss = new WebSocket.Server({server});

var exeobj = [];
for(let i in executors) {
    exeobj[exeobj.length] = new executors[i](wss);
}

wss.on("connection", (ws) => {
    Logger.log("WebSocket", "Client connected");
    
    ws.on("message", (data) => {
        data = JSON.parse(data);
        
        switch(data.type) {
            case "command":
                new Command(data, wss, exeobj);
                Logger.log("$", "Client command: "+ data.cmd);
                break;
            case "data":
                new DataStream(data.content, wss, exeobj);
                break;
        }
    });
});

server.listen(5000, () => {
    Logger.log("$", "Server Started");

    keypress(process.stdin);
    process.stdin.on("keypress", (ch, key) => {
        if(key && key.ctrl && key.name == "c") {
            process.exit(0);
        }
    });
});
