var express=require('express');
var bodyParser=require('body-parser');
var socket = require('socket.io');
var app=express();

/* templating engine for dynamic comtent */
app.set('view engine','ejs');

/* middleware */
app.use('/assets',express.static('assets')); // name of the folder where my static files are (assets)

// parse application
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//requests
global.users = [];
app.get('/',(req,res)=>{
        res.render('index');
    })
// server
var server=app.listen(3000,()=>{
    console.log('listening to port 3000');
});

function findId(users,data){
    return users.find((user)=>{
        return user.localid == data.chatId
    })
}
var found;
// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {
    var socketid=socket.id;
    socket.on('pageReady', function(data){
        users.push({
            localid:data.localid,
            serverid:socketid
        })
        console.log(users);
    });

    socket.on('chat',function(data){
        console.log("data found:",data.chatId)
        found = findId(users,data);
        io.to(`${found.serverid}`).emit('hey', {
            sender: socket.id,
            message: 'i am sending a private message to you'
        });
    })
    
});