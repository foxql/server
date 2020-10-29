const foxqlServer = require('../index.js');
const clientModel = require('../src/models/client-model.js')

const server = new foxqlServer();

server.use('serverOptions', {
    protocol : 'http'
});

server.open();

server.io.on('connection', (socket)=>{
    const id = socket.id;
    socket.connections = new clientModel();

    server.pushClient(id);

    server.eventList.forEach(event => {   
        socket.on(event.name, data => {
            event.listener(socket, server, data);
        });
    });

    socket.on('disconnect', ()=>{
        server.disconnectClient(id);
    });

    console.log('user connected!', socket.id);
});
