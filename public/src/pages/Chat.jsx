import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from '../components/ChatContainer';

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const chatEffect = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");

      } else {
        let user = JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUser(user);
        setIsLoaded(true);
        await axios.get(`${allUsersRoute}/${user._id}`).then((res) => {
          setContacts(res.data);
        }).catch((err) => console.log(err))
      }
    }
    chatEffect();
  }, [])


  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser}
          changeChat={handleChatChange} />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} />
        )}

      </div>
    </Container>
  );
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content:center;
gap: 1rem;
align-items: center;
background-color: #3D3A4B;
.container{
  height: 95vh;
  width: 100vw;
  background-color: #5E5973;
  display: grid;
  grid-template-columns: 35% 65%;
 
}

`;

export default Chat;