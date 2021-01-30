import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import ScrollToBottom from 'react-scroll-to-bottom';

import Messages from './Messages'
import InChat from "./InChat";

function ChatRoom(props) {
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');
    const [teamInfo, setTeamInfo] = useState([])

    const { teamName } = props.location.state
    const { teamAbv } = props.location.state
    const urlTeam = window.location.href.slice(27)
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user.name
    const userId = user._id
    const ENDPOINT = 'http://localhost:5000'
    const socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

    useEffect(() => {
        axios.get('https://api.sportsdata.io/v3/nba/scores/json/teams?key=16923d3bd73041b2a929d0c5e34fb5b1')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].Key === teamAbv) {
                        setTeamInfo(res.data[i])
                    }
                }
            })
    }, [])

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
        <div className="alert" role="alert" style={{ backgroundColor: '#0a3556', borderRadius: '25px', height: '80%', border: `5px solid #${teamInfo.PrimaryColor}` }}>
            <div className='row'>
                <div className='col-md-4'>
                    <div style={{ backgroundColor: '#0d4975', borderRadius: '25px', border: `5px solid #${teamInfo.SecondaryColor}`, height: '525px', padding: '3%'}}>
                    <div className='row'>
                        <h3 style={{ color: 'white', marginTop: '5%' }}>{teamName} Chat!</h3>
                    </div>
                    <div className='row'>
                        <br />
                        <div style={{ height: '150px', width: '150px', backgroundColor: 'white', borderRadius: '25px', margin: 'auto' }} >
                            <img src={teamInfo.WikipediaLogoUrl} style={{ height: '95%', width: '95%' }} alt='Team Logo' />
                        </div>
                        <InChat users={users} />
                    </div>
                    </div>
                </div>

                <div className='col-md-8'>
                    <div>
                        <div className="alert" role="alert" style={{ backgroundColor: '#0d4975', borderRadius: '25px', border: `5px solid #${teamInfo.SecondaryColor}` }}>
                            <Messages messages={messages} name={userName} />
                            <br />
                            <div className="input-group mb-3">
                                <input value={message} onChange={e => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} type="text" className="form-control" placeholder="Enter Message" aria-label="Recipient's username" aria-describedby="button-addon2" style={{ borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }} />

                                <button className="btn" type="button" id="button-addon2" onClick={sendMessage} style={{ backgroundColor: '#016ab5', color: 'white', borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }}>Send Message</button>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom
