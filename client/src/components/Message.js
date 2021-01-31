import React from 'react'

const Message = ({ message: { user, text }, name }) => {
    
    let isSentByCurrentUser = false;
    if (name === user) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ? (

<div className='row' style={{ width: '75%'}}>
                    <div className='col-sm-12'>
                        <p style={{ color: 'white', marginTop: '0'}}> {name} </p>
                        <div className="alert alert-primary" role="alert" style={{borderBottomLeftRadius: '25px', borderTopRightRadius: '25px', borderBottomRightRadius: '25px'  }}>
                            <p>{text}</p>
                        </div>
                    </div>
                </div>
        ) : (
            <div className='row' style={{ width: '75%', float: 'right'  }}>
            <div className='col-sm-12'>
                <p style={{ color: 'white' }}> {name} </p>
                <div className="alert alert-dark" role="alert" style={{borderBottomLeftRadius: '25px', borderTopLeftRadius: '25px', borderBottomRightRadius: '25px'  }}>
                    {text}
                </div>
            </div>
        </div>
            )
    )
}

export default Message;