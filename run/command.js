/**
 * Do Ternimal By NriotHrreion
 * 
 * (c) 2021 NriotHrreion
 */

const WebSocket = require("ws");
const executors = require("./executor");
const Logger = require("../util/logger");

class Command {
    /**
     * 
     * @param {object} data 
     * @param {WebSocket.Server} wss 
     */
    constructor(data, wss, exeobj) {
        this.executors = exeobj;

        this.wss = wss;
        this.cmd = data.cmd;
        this.args = data.cmd.split(" ");
        this.length = this.args.length;

        this.input();
    }

    input() {
        if(this.args[0] == "help") {
            this.wss.clients.forEach(function(client) {
                client.send(JSON.stringify({
                    action: 
                    `
                    control.writeInfoLine(
                        "\nCommand Help\n"+
                    );
                    `
                }));
            });
        } else {
            for(let i in this.executors) {
                this.executors[i].onCommand(this.cmd, this.args, this.length);
            }
        }
    }
}

module.exports = Command;
