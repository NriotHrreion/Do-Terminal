/**
 * Do Ternimal By NriotHrreion
 * 
 * (c) 2021 NriotHrreion
 */

const WebSocket = require("ws");
const Logger = require("../util/logger");

// var helpmap = [
//     "echo",
//     "title", "alert",
//     "uuid", "guid",
//     "ttt"
// ];

class Echo {
    
    /**
     * 
     * @param {WebSocket.Server} wss 
     */
    constructor(wss) {
        this.wss = wss;
    }

    onCommand(cmd, args, length) {
        if(args[0] == "echo" && args.length > 1) {
            this.wss.clients.forEach(function(client) {
                client.send(JSON.stringify({
                    action: 'control.writeLine("'+ cmd.replace("echo ", "") +'")'
                }));
            });
        }
    }
}

class Tools {

    /**
     * 
     * @param {WebSocket.Server} wss 
     */
    constructor(wss) {
        this.wss = wss;
    }

    onCommand(cmd, args, length) {
        if(args[0] == "title" && args.length > 1) {
            this.wss.clients.forEach(function(client) {
                client.send(JSON.stringify({
                    action: 'document.title = "'+ cmd.replace("title ", "") +'";control.writeInfoLine("Tools => Title set.")'
                }));
            });
        } else if(args[0] == "alert" && args.length > 1) {
            this.wss.clients.forEach(function(client) {
                client.send(JSON.stringify({
                    action: 'alert("'+ cmd.replace("alert ", "") +'");control.writeInfoLine("Tools => Alert.")'
                }));
            });
        }
    }
}

class Id {

    /**
     * 
     * @param {WebSocket.Server} wss 
     */
    constructor(wss) {
        this.wss = wss;
    }

    onCommand(cmd, args, length) {
        if(args[0] == "uuid") {
            var str = [];
            var texts = "0123456789abcdef";
            for(var i = 0; i < 36; i++) {
                str[i] = texts.substr(Math.floor(Math.random() * 0x10), 1);
            }
            str[14] = "4";
            str[19] = texts.substr((str[19] & 0x3) | 0x8, 1);
            str[8] = str[13] = str[18] = str[23] = "-";

            this.wss.clients.forEach(function(client) {
                client.send(JSON.stringify({
                    action: 'control.writeInfoLine("UUID => '+ str.join("") +'")'
                }));
            });
        } else if(args[0] == "guid") {
            var str = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0;
                var v = c == "x" ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });

            this.wss.clients.forEach(function(client) {
                client.send(JSON.stringify({
                    action: 'control.writeInfoLine("GUID => '+ str +'")'
                }));
            });
        }
    }
}

class Tictactoe {

    /**
     * 
     * @param {WebSocket.Server} wss 
     */
    constructor(wss) {
        this.wss = wss;
    }

    onCommand(cmd, args, length) {
        if(args[0] == "ttt") {
            this.wss.clients.forEach(function(client) {
                client.send(JSON.stringify({
                    action: 
                    `
                    control.writeInfoLine("Tictactoe game Start!");
                    control.readLine("#ttt");
                    `
                }));
            });
        }
    }
    
    onData(data) {
        if(data.indexOf("#ttt ") > -1) {
            this.wss.clients.forEach(function(client) {
                client.send(JSON.stringify({
                    action: 'control.writeLine("'+ data.replace("#ttt ", "") +'")'
                }));
            });
        }
    }
}

// Executor List
module.exports = [
    Echo,
    Tools,
    Id,
    Tictactoe
];
