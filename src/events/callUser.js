const name = 'callUser';

exports.listener = (socket, server, payload) => {

    const offer = payload.offer || false;
    const to = payload.to || false;
    
    if(!offer || !to) return false;

    const userId = socket.id;
    console.log(userId, ` şu kişiyle: (${to}) Bağlantı kurmaya çalışıyor.`);

    server.io.to(to).emit(name,  {
        offer : offer,
        socket : userId
    });

}

exports.name = name;
