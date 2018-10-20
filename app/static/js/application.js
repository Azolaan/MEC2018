$(document).ready(function(){
    
    var socket = io.connect('http://127.0.0.1:5000/test');
    var textrecieved = [];
    socket.on('newtext', function(msg){
        textrecieved.push(msg.text);
        
        text_string = '';
        for(var i = 0; i < textrecieved.length; i++) {
            text_string = text_string + '<p>' + textrecieved[i] + '</p>';
        }
        $('#log').html(text_string);
    });
});