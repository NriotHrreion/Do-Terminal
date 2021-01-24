/**
 * @param {HTMLDivElement} outputElem output
 * @param {WebSocket} ws WebSocket Object
 * 
 * @class
 */
function Control(outputElem, ws) {
    /** @type {HTMLDivElement} */
    this.elem = outputElem;
    this.ws = ws;
}

Control.prototype = {
    webSocketSend: function(content) {
        this.ws.send(JSON.stringify({
            type: "data",
            content: content
        }));
    },
    writeLine: function(content) {
        var line = document.createElement("p");
        var date = new Date();
        var h = date.getHours() < 10 ? "0"+ date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? "0"+ date.getMinutes() : date.getMinutes();
        var s = date.getSeconds() < 10 ? "0"+ date.getSeconds() : date.getSeconds();
        line.innerHTML = "["+ h +":"+ m +":"+ s +"] "+ content;
        this.elem.appendChild(line);
    },
    writeInfoLine: function(content) {
        var line = document.createElement("p");
        var date = new Date();
        var h = date.getHours() < 10 ? "0"+ date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? "0"+ date.getMinutes() : date.getMinutes();
        var s = date.getSeconds() < 10 ? "0"+ date.getSeconds() : date.getSeconds();
        line.innerHTML = "["+ h +":"+ m +":"+ s +"][<span id='info'>Info</span>] "+ content;
        this.elem.appendChild(line);
    },
    writeErrorLine: function(content) {
        var line = document.createElement("p");
        var date = new Date();
        var h = date.getHours() < 10 ? "0"+ date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? "0"+ date.getMinutes() : date.getMinutes();
        var s = date.getSeconds() < 10 ? "0"+ date.getSeconds() : date.getSeconds();
        line.innerHTML = "["+ h +":"+ m +":"+ s +"][Error] <span id='err'>"+ content +"</span>";
        this.elem.appendChild(line);
    },
    writeWarningLine: function(content) {
        var line = document.createElement("p");
        var date = new Date();
        var h = date.getHours() < 10 ? "0"+ date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? "0"+ date.getMinutes() : date.getMinutes();
        var s = date.getSeconds() < 10 ? "0"+ date.getSeconds() : date.getSeconds();
        line.innerHTML = "["+ h +":"+ m +":"+ s +"][Warning] <span id='warn'>"+ content +"</span>";
        this.elem.appendChild(line);
    },
    readLine: function(flag) {
        var readinput = document.getElementById("read");
        var input = document.getElementById("input");

        input.blur();
        readinput.type = "text";
        readinput.setAttribute("flag", flag);
        input.type = "hidden";
        readinput.focus();
    },
}
