import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/thelogo.png"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from '../utils/APIRoutes';


function Login() {
  const navigate = useNavigate()

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  const handleValidation = () => {
    const { password, username, } = values;
    if (password === "") {
      toast.error("Email and Password is required!", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Email and Password is required!", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    console.log(values.username)
    event.preventDefault();
    if (handleValidation()) {
      // const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username: values.username,
        password: values.password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };


  return (<>
    <FormContainer>
      <form action="" onSubmit={(event) => handleSubmit(event)}>
        <div className='brand'>
          <img src={Logo} alt="logo" />
          <h1>Floppie Chat</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
          min="3"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />

        <button type="submit">Login</button>
        <span>Don't have an account?
          <Link to="/register">Register
          </Link>
        </span>
      </form>
    </FormContainer>
    <ToastContainer />
  </>
  )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center; 
gap: 1rem;
align-items: center;
background-color: #3D3A4B;
.brand{
  display: flex;
  align-items: center;
  gap:1rem;
  justify-content: center;
img {
  height: 5rem;
}
h1{
  color: white;
  text-transform: uppercase;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #5E5973;
  border-radius: 1rem;
  padding: 2rem 3rem;
  input{
    background-color:#DEDCE4;
    padding: 1rem;
    border: 0.1rem ;
    border-radius: 0.4rem;
    color: #5E5973;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button{
    background-color: #918CA6;
    color: white;
    border-radius: 0.4rem;
    padding: 1rem 2rem;
    font-size: 1rem;
    border:none;
    cursor: pointer;
    transition: 0.5s ease-in-out;
&:hover {
  background-color:#3D3A4B;
        }
      }
  span {
    color: white; 
    text-align: center;
    
  a {
  
    color: white;
    margin-left: 1.5rem;
    text-decoration: none;
    background-color: #918CA6;
    color: white;
    border-radius: 0.4rem;
    padding: 0.4rem 1rem;
    font-size: 1rem;
    border:none;
    cursor: pointer;
    transition: 0.5s ease-in-out;
    &:hover{
      background-color:#3D3A4B;
    }
   }
 }
} 
`;

export default Login;