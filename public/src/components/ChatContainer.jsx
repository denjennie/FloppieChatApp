import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Messages from "./Messages";
import axios from "axios";
import { sendMessageRoute } from "../utils/APIRoutes";


export default function ChatContainer({ currentChat, currentUser }) {



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
          <Messages />
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    )}

  </>
}


const Container = styled.div`
padding-top: 1rem;
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
`;