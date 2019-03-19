const express = require('express'),
    app = express(),
    http = require('http'),
    ws = require('socket.io');


// 获取post参数
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// 静态资源目录
app.use(express.static(__dirname + '/public'));

let server = app.listen(78);
let io = ws(server);

let num = 0;
io.on('connection',socket=>{
    //console.log(socket);
    socket.on("mesg",(data)=>{
        //console.log(data);
        io.emit('mesg',{content:data.data,name:data.name});
    })

    socket.on("enter",(data)=>{
        //console.log(data);
        socket.name = data.name;
        num++;
        io.emit('enter',{content:`欢迎${data.name}进入聊天室`,unum:num});
    })

    socket.on("disconnect",()=>{
        //console.log(socket.name);
        num--;
        io.emit("out",{content:`${socket.name}退出了聊天室`,unum:num});
    })
})
















