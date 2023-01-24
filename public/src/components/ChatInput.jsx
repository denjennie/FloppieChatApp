import React, { useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io"


export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  }
  return <>
    <Container>
      <div className="button-container"></div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type anything here!"
          value={msg}
          onChange={(e) => setMsg(e.target.value)} />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  </>
}
const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0.2rem;
  
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    }
  }
  .input-container {
    width: 100%;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 0.3rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      border-radius: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
     
      }
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;