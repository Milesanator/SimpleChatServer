var socket = io();
// emit message to socket
$('form').submit(function () {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
// Add message to message feed
socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
});