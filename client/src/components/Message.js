import React from 'react'

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase()

    if (user === trimmedName) {

    }

    return (
        isSentByCurrentUser ? (
            <div className='row' style={{width: '50%'}}>
                <div className='col-sm-12'>
                    {name}
                    <div className="alert alert-primary" role="alert">
                        {text}
                    </div>
                </div>
            </div>
        ) : (
            <div className='row' style={{width: '50%'}}>
            <div className='col-sm-12'>
                {name}
                <div className="alert alert-success" role="alert" style={{ overflowWrap: 'break-word'}}>
                    {text}
                </div>
            </div>
        </div>
            )
    )
}

export default Message;