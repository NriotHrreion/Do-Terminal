# Do Terminal
By NriotHrreion

## 环境

因为这个工程是使用node编写的

所以运行它之前, 你的电脑必须得安装[Node.js](https://nodejs.org)

## 使用

下载后，进入工程根目录后安装依赖

```cmd
npm install
```

接着运行

```cmd
$ node index
```

输出以下内容即运行成功
```cmd
[00:00:00] $ Server Started
```

## 添加指令

在工程根目录下`run`文件夹找到`executor.js`，

这里就可以通过代码添加指令了

**executor.js 教程示例:**

```js
// echo 指令示例

class Echo {
    
    /**
     * 
     * @param {WebSocket.Server} wss 
     */
    constructor(wss) { // 获取WebSocket服务器对象
        this.wss = wss;
    }

    onCommand(cmd, args, length) { // 指令接收事件
        if(args[0] == "echo" && args.length > 1) { // args[0] 是用户发送的指令
            this.wss.clients.forEach(function(client) { // 向客户端发送消息
                client.send(JSON.stringify({
                    action: 'control.writeLine("'+ cmd.replace("echo ", "") +'")' // action 是在客户端运行的js代码
                }));
            });
        }
    }
    
    // 这里还有提供readline方法, onData 是readline接收事件
    // 你可以在向客户端发送消息的时候, 在action里面加上这一句来使用这个功能:
    // control.readLine("#hello")
    // 在这其中, "#hello" 是标记符号, 可以是任何字符
    // 但是在onData中, 你就得通过判断是不是这个标记来判断这个信息是不是你要的
    //
    // onData(data) {
    //     if(data.indexOf("#hello ") > -1) {
    //         //
    //     }
    // }
}

module.exports = [
    Echo // 一定要在这里写上新创建的指令类，否则无效
];
```

## 许可

MIT
