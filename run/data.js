/**
 * Do Ternimal By NriotHrreion
 * 
 * (c) 2021 NriotHrreion
 */

const WebSocket = require("ws");
const executors = require("./executor");
const Logger = require("../util/logger");

class DataStream {
    /**
     * 
     * @param {object} data 
     * @param {WebSocket.Server} wss 
     */
    constructor(data, wss, exeobj) {
        this.executors = exeobj;

        this.data = data;
        this.wss = wss;

        this.passData();
    }

    passData() {
        for(let key in this.executors) {
            if(executors[key].prototype.onData != undefined) {
                this.executors[key].onData(this.data);
            }
        }
    }
}

module.exports = DataStream;
