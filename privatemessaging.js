const connectedUsers = {};
const { User, Chat } = require('./models');

module.exports = (io) => {
    io.sockets.on('connection', (socket) => {
        
        socket.on('connectUser', (data) => {
            if (data in connectedUsers) {
                console.log("User already connected")
            } else {
                console.log("User connected")
                socket.uId = data;
                connectedUsers[socket.uId] = socket;
            }
        });
        
        socket.on('newMessage', (data) => {
            console.log("incoming data:", data)
            if (data.to._id in connectedUsers) {
                connectedUsers[data.to._id].emit("newMessage", {from: data.from, to: data.to, roomId: data.roomId, message: data.message})
            }
            const roomId = (data.to._id > data.from._id) ? data.to._id + data.from._id : data.from._id + data.to._id;
            Chat.create({
                roomId,
                users: [data.to._id, data.from._id],
                messages: [{
                    to: data.to._id,
                    from: data.from._id,
                    message: data.message
                }]
            }).then(response => {
                User.updateMany({
                    _id: {
                        $in: [data.to._id, data.from._id]
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
                                to: data.to._id,
                                from: data.from._id,
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
            console.log("User disconnecting")
            delete connectedUsers[socket.uId];
        });
    });
}