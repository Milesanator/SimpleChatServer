var io = require('socket.io').listen(5000);

io.sockets.on('connection', function (socket) {

});

var should = require('should');
var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:5000';

var options ={
    transports: ['websocket'],
    'force new connection': true
};

describe("Chat Server",function(){
    it('Should be able to broadcast messages', function(done){
        var client1, client2, client3;
        var message = 'Hello World';
        var messages = 0;

        var checkMessage = function(client){
            client.on('chat message', function(msg){
                message.should.equal(msg);
                client.disconnect();
                messages++;
                if(messages === 3){
                    done();
                };
            });
        };

        client1 = io.connect(socketURL, options);
        checkMessage(client1);

        client1.on('connect', function(data){
            client2 = io.connect(socketURL, options);
            checkMessage(client2);

            client2.on('connect', function(data){
                client3 = io.connect(socketURL, options);
                checkMessage(client3);

                client3.on('connect', function(data){
                    client2.emit('chat message', message);
                });
            });
        });
    });
});

// describe('server', function() {
//     it('should send messages', function(){
//
//     });
//     it('should receive sent messages(without refresh)', function(){
//         $('#m').val("Test post");
//         $('form#message-form').submit();
//         expect($('#messages li').last().length).to.be.equal("Test post");
//     });
// });
