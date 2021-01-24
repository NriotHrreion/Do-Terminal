var input = document.getElementById("input");
var readinput = document.getElementById("read");
var output = document.getElementById("output");

var ws = new WebSocket("ws://"+ location.hostname +":5000");
var control = new Control(output, ws);

if(!"WebSocket" in window) {
    control.writeErrorLine("Your browser doesn't support WebSocket!");
}

control.writeLine(
    "\n(c) 2021 NriotHrreion.\n"+
    "Github: https://github.com/NriotHrreion\n"+
    "============================\n"+
    "Welcome to use Do Terminal!\n"+
    "============================\n\n"
);

input.onchange = function() {
    ws.send(JSON.stringify({
        type: "command",
        cmd: this.value
    }));
    this.value = "";
};

readinput.onchange = function() {
    ws.send(JSON.stringify({
        type: "data",
        content: this.getAttribute("flag") +" "+ this.value
    }));
    
    this.setAttribute("flag", "");
    this.value = "";
    this.blur();
    this.type = "hidden";
    input.type = "text";
    input.focus();
};

document.body.onbeforeunload = function() {
    ws.close();
};

ws.onopen = function(e) {
    control.writeLine("Server Connected");
    input.focus();
};

ws.onclose = function(e) {
    control.writeLine("Server Closed");
    output.scrollTop = output.scrollHeight;
};

ws.onerror = function(e) {
    control.writeErrorLine("Server Error");
    output.scrollTop = output.scrollHeight;
};

ws.onmessage = function(e) {
    var data = JSON.parse(e.data);

    eval(data.action);
    output.scrollTop = output.scrollHeight;
};
