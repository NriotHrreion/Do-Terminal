/**
 * Do Ternimal By NriotHrreion
 * 
 * (c) 2021 NriotHrreion
 */

const chalk = require("chalk");
const moment = require("moment");

class Logger {
    static log(info, content) {
        var time = moment().format("HH:mm:ss");
        console.log("["+ time +"] "+ chalk.green(info) +" "+ content);
    }

    static debug(content) {
        var time = moment().format("HH:mm:ss");
        console.log("["+ time +"] "+ chalk.green("Debug") +" "+ content);
    }
}

module.exports = Logger;
