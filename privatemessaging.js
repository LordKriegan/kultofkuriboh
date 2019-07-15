const connectedUsers = {};
const { User, Chat } = require('./models');

module.exports = (io) => {
    io.sockets.on('connection', (socket) => {
        
        socket.on('connectUser', (data, cb) => {
            if (data in connectedUsers) {
                console.log("User already connected")
            } else {
                console.log("User connected")
                socket.uId = data;
                connectedUsers[socket.uId] = socket;
            }
        });
        
        socket.on('newMessage', (data) => {
            if (data.to in connectedUsers) {
                connectedUsers[data.to].emit("newMessage", {from: data.userInfo, message: data.message})
            }
            const roomId = (data.to > data.from) ? data.to + data.from : data.from + data.to;
            Chat.create({
                roomId,
                users: [data.to, data.from],
                messages: [{
                    to: data.to,
                    from: data.from,
                    message: data.message
                }]
            }).then(response => {
                User.updateMany({
                    _id: {
                        $in: [data.to, data.from]
                    }
                }, {
                    $push: {
                        chats: roomId
                    }
                }, (err, resp) => {
                    if (err) {
                        io.sockets.emit("error", "failed to save chat room to users profiles: " + JSON.stringify(err));
                        console.log(err);
                    }
                })
            }).catch(error => {
                if (error.message === "Chat validation failed: roomId: Room already exists!") {
                    Chat.updateOne({
                        roomId
                    }, {
                        $push: {
                            messages: {
                                to: data.to,
                                from: data.from,
                                message: data.message
                            }
                        }
                    }, (err, resp) => {
                        if(err) {
                            io.sockets.emit("error", "failed to save message to database: " + JSON.stringify(resp))
                        }
                    })
                } else {
                    console.log(error);
                    io.sockets.emit("error", "Error while trying to create room: " + JSON.stringify(error))
                }
            })
            
        });
        socket.on('disconnect', (data) => {
            if (!socket.uId) return;
            delete connectedUsers[socket.uId];
        });
    });
}