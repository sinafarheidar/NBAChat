import React, { useEffect, useRef } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';


const Messages = ({ messages, name }) => {

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
      };

    return (
    <ScrollToBottom>
    <div style={{maxHeight: '400px', height: '400px', overflowY: 'scroll'}}>
    {messages.map((message, i) => <div key={i}> <Message message={message} name={name}/> </div>)}
    <AlwaysScrollToBottom />
    </div>
    </ScrollToBottom>
    )

}

export default Messages
