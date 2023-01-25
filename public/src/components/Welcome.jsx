import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif"



export default function Welcome() {
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h2>
        Welcome!
      </h2>
      <h3>Please select a </h3>
      <h3>chat to start messaging</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
img{
  height: 10rem;
}

`;