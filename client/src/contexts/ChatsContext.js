import React, { useState, useEffect, createContext } from 'react';
import { User } from '../api/';
import axios from 'axios';
import openSocket from 'socket.io-client';

export const ChatsContext = createContext()

const ChatsContextProvider = (props) => {
    const [chatData, setChatData] = useState({
        currRoomIndex: 0,
        chats: [],
        isChatOpen: false,
        socket: ""
    });
    const toggleChatBar = () => {
        setChatData({
            ...chatData,
            isChatOpen: !chatData.isChatOpen
        });
    }
    const createNewChat = (targId) => {
        const myId = User.getUser().id
        let roomId = (targId > myId) ? targId + myId : myId + targId;
        const newIndex = chatData.chats.findIndex(elem => elem.roomId === roomId);
        if (newIndex !== -1) {
            setChatData(prevState => {
                console.log(prevState);
                return {
                    ...chatData,
                    currRoomIndex: newIndex,
                    isChatOpen: true
                }
            })
        } else {
            axios
                .all([User.findOne(targId), User.findOne(myId)])
                .then(response => {
                    const newRoom = {
                        roomId: roomId,
                        messages: [],
                        users: [
                            { name: response[0].data.name, picture: response[0].data.picture, _id: response[0].data._id },
                            { name: response[1].data.name, picture: response[1].data.picture, _id: response[1].data._id }
                        ]
                    }
                    const newChats = [...chatData.chats]
                    newChats.push(newRoom);
                    const newState = {
                        ...chatData,
                        currRoomIndex: newChats.length - 1,
                        chats: newChats,
                        isChatOpen: true
                    }
                    console.log(newState)
                    setChatData(newState);
                })
                .catch(err => console.error(err));
        }
    }
    const changeRoom = (roomIndex) => setChatData({
        ...chatData,
        currRoomIndex: roomIndex
    });
    const sendNewMsg = (target, message) => {

        const from = {
            picture: User.getUser().picture,
            name: User.getUser().name,
            _id: User.getUser().id
        }

        chatData.socket.emit("newMessage", {
            to: target,
            from: from,
            message: message,
            roomId: chatData.chats[chatData.currRoomIndex].roomId
        })
        setChatData(prevState => {
            let newArr = [...prevState.chats[prevState.currRoomIndex].messages]
            let from = prevState.chats[prevState.currRoomIndex].users.filter(elem => elem._id === User.getUser().id)[0]
            let to = prevState.chats[prevState.currRoomIndex].users.filter(elem => elem._id !== User.getUser().id)[0]
            newArr.push({
                from,
                to,
                message: message
            });
            let newChats = [...prevState.chats];
            newChats[prevState.currRoomIndex].messages = newArr;
            return {
                ...prevState,
                chats: [...newChats]
            };
        })
    }
    useEffect(() => {
        if (User.getToken()) {
            const myId = User.getUser().id;
            User
                .findChats(myId)
                .then((response) => {
                    console.log(response.data);
                    const socket = openSocket('/')
                    setChatData({
                        ...chatData,
                        chats: response.data,
                        socket: socket
                    });
                })
                .catch(err => console.error(err));
        }
    }, [])

    useEffect(() => {
        const { socket } = chatData;
        if (socket) {
            socket.emit("connectUser", User.getUser().id);
            socket.on("disconnect", () => {
                const newSock = openSocket('/')
                setChatData({
                    ...chatData,
                    socket: newSock
                })
            })
            socket.on("error", (data) => console.log(data));
            socket.on("newMessage", (data) => {
                console.log(data)
                console.log("chats", chatData)
                const foundIndex = chatData.chats.findIndex(elem => {
                    console.log(elem)
                    return elem.roomId === data.roomId
                })

                if (foundIndex !== -1) {
                    setChatData(prevState => {
                        let newArr = [...prevState.chats[foundIndex].messages]
                        let from = data.from
                        let to = {
                            name: User.getUser().name,
                            picture: User.getUser().picture,
                            _id: User.getUser().id
                        }
                        newArr.push({
                            from,
                            to,
                            message: data.message
                        });
                        let newChats = [...prevState.chats];
                        newChats[foundIndex].messages = newArr;
                        return {
                            ...prevState,
                            chats: [...newChats]
                        };
                    })
                } else {
                    const newRoom = {
                        roomId: (data.from._id > data.to._id) ? data.from._id + data.to._id : data.to._id + data.from._id,
                        users: [data.from, data.to],
                        messages: [{
                            to: data.to,
                            from: data.from,
                            message: data.message
                        }]
                    }
                    const newChats = [...chatData.chats]
                    newChats.push(newRoom)
                    const newState = {
                        ...chatData,
                        chats: newChats
                    }
                    setChatData(newState)
                }
            });
        }
    }, [chatData.socket])
    return (
        <ChatsContext.Provider value={{ ...chatData, toggleChatBar, createNewChat, sendNewMsg, changeRoom }}>
            {props.children}
        </ChatsContext.Provider>
    );
}

export default ChatsContextProvider;