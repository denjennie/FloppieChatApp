import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from "../assets/thelogo.png"

export default function Contacts({ contacts, currentUser, changeChat }) {

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined)
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]
  )
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return <>
    {

      <Container>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h3>Floppie Chat</h3>
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                key={index}
                onClick={() => changeCurrentChat(index, contact)}>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            )
          })}


        </div>
        <div className="current-user">
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
      </Container>

    }
  </>

}
const Container = styled.div`
  display: grid;
  min-width: 10rem;
  grid-template-rows: 10% 85% 5%;
  overflow: hidden;
  background-color: #080420;
 
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
 img {
  height: 2rem;
 }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 3rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
    
      .username {
        h3 {
          
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #1C1B23;
    border-radius: 2rem;
    max-width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;

    .username {
      h2 {
        font-size: 1rem;
    
        color: white;
      }
    }
  
  }
`;