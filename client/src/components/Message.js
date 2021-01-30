import React from 'react'
import { ChatItem } from 'react-chat-elements'

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase()

    if (user === trimmedName) {

    }

    return (
        isSentByCurrentUser ? (
            <div className='row' style={{ width: '75%' }}>
                <div className='col-sm-12'>
                    <p style={{ color: 'white' }}> {name} </p>
                    <div className="alert alert-dark" role="alert">
                        {text}
                    </div>
                </div>
            </div>

        ) : (
                <div className='row' style={{ width: '75%' }}>
                    <div className='col-sm-12'>
                        <p style={{ color: 'white', marginTop: '0'}}> {name} </p>
                        <div className="alert alert-primary" role="alert" style={{borderBottomLeftRadius: '25px', borderTopRightRadius: '25px', borderBottomRightRadius: '25px'  }}>
                            <p>{text}</p>
                        </div>
                    </div>
                </div>
            )
    )
}

export default Message;