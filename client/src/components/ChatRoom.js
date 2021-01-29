import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField';

import Messages from './Messages'
import InChat from "./InChat";

function ChatRoom(props) {
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');

    const { teamName } = props.location.state
    const { teamAbv } = props.location.state
    const urlTeam = window.location.href.slice(27)
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user.name
    const userId = user._id
    const ENDPOINT = 'http://localhost:5000'
    const socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });


    useEffect(() => {

        socket.emit('join', { name: userName, teamName: teamName, room: urlTeam, id: userId }, () => {
        });

        return () => {
            socket.emit('disconnectRoom', { name: userName, room: urlTeam, id: userId }, () => {
            });

            socket.off()
        }

    }, [ENDPOINT, urlTeam, userName, teamName])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, urlTeam, userName, () => {
                setMessages([...messages, { text: message, user: userName }])
                setMessage('')
            })

            
        }
    }

    return (
        <div className="alert alert-dark" role="alert">
            <div className='row'>
                <h1>Welcome to the {teamName} Chat!</h1>
            </div>
            <div>
                <InChat users={users}/>
                <Messages messages={messages} name={userName}/>
                <div className="input-group mb-3" style={{width: '75%'}}>
                    <input value={message} onChange={e => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} type="text" className="form-control" placeholder="Message:" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={sendMessage} style={{backgroundColor: '#016ab5', color: 'white'}}>Send Message</button>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom
