import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid"

export default function ChatContainer({ currentChat, currentUser }) {

  const [messages, setMessages] = useState([]);

  const startSSE = () => {
    let sse = new EventSource('/api/sse')

    sse.addEventListener('connect', message => {
      let data = JSON.parse(message.data)
      console.log('[connect]', data);
    })

    sse.addEventListener('disconnect', message => {
      let data = JSON.parse(message.data)
      console.log('[disconnect]', data);
    })

    sse.addEventListener('new-message', message => {
      let data = JSON.parse(message.data)
      console.log('[new-message]', data);
      messages.push(data)
      setMessages([...messages])
    })
  }

  useEffect(() => {
    startSSE()
  }, [])
  
  const messageEffect = async () => {
      if (currentChat) {
        const response = await axios.get(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    /* let messageDiv = document.querySelector('.chat-messages');
    messageDiv.scrollTop = messageDiv.scrollHeight; */
  }
  

 /*  useEffect(() => {
    let interval = setInterval(messageEffect, 300);
    return () => clearInterval(interval);
  }, []); */

  useEffect(() => {
    messageEffect();
  }, [currentChat])

  useEffect(()=>console.log(messages),[messages])

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    })
  }



  return <>
    {currentChat && (
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="username">
              <h3>
                {currentChat.username}
              </h3>
            </div>
          </div>
          <Logout />
        </div>
        <div className="chat-messages">
          {messages.map((message) => <MessageBubble message={message} />)}
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    )}
  </>

  function MessageBubble({ message }) {
    console.log("create message bubble with data: ", message)
    const isSender = message.sender === currentUser._id
    console.log('is sender of message: ', isSender)
  return <div key={uuidv4()}>
                <div className={`message ${isSender ? "sended" : "recieved"}`}>
                  <div className="content">
                    <p>{message.message.text}</p>
                  </div>
                </div>
              </div>
}
  
}


const Container = styled.div`
display: grid;
grid-template-rows: 10% 78% 12%;
gap: 0.1rem;
overflow: hidden;
 
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap 1rem;
    }
    .username {
      h3{
        color:white;
      }
    }
}
.chat-messages {
  padding: 0.1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar{
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;

    }
  }
  .message{
    display: flex;
    align-items: center;
    .content {
      max-width: 65%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .recieved{
        justify-content: flex-start;
    .content {
          background-color: #9900ff20;
        }
  }
}

`;