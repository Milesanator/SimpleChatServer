var should = require('should');
var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:3000';

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
