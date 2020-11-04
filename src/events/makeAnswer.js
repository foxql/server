const name = 'makeAnswer';

exports.listener = (socket, server, payload) => {
    const userId = socket.id;

    console.log(userId, 'Tarafından sdp çağrısı yanıtlandı.');

    server.io.to(payload.to).emit('answerMade',  {
        socket : userId,
        answer : payload.answer
    });

}

exports.name = name;
