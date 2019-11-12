
var socket = io.connect('http://localhost:3000');
window.addEventListener('load', bindEvents);
function bindEvents(){
    var num = document.getElementById('clientID');
    var btn = document.getElementById('start')
    var friendId = document.getElementById('friendId')
    var output = document.getElementById('output')
    var myId = generateNum();
    console.log(myId);
    num.value += myId;
    
    //
   
    socket.emit('pageReady',{
        localid:myId
    });

   btn.addEventListener('click', function(){
    socket.emit('chat', {
        chatId:friendId.value
    }); 
});

socket.on('hey',function(data){
    output.innerHTML = 'Socket ID : '+ data.sender +' :'+ data.message;
})
}
function generateNum(){
    return Math.floor(100000000 + Math.random() * 900000000);
}

