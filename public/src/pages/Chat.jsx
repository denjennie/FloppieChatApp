import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";

function Chat() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {


  }, [])


  return (
    <Container>
      <div className="container">

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
  height: 85vh;
  width: 85vw;
  background-color: #5E5973;
  border-radius: 1rem;
  padding: 2rem 3rem;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px){
      grid-template-columns: 35% 65%;

  }
}

`;

export default Chat;