import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/thelogo.png"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from '../utils/APIRoutes';


function Register() {
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
    email: "",
    password: "",
    confirmPassword: "",
  });

  /*  useEffect(() => {
     if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
       navigate("/");
     }
   }, []); */


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })

  }
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
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
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Create User</button>
        <span>Already have an account?
          <Link to="/login">Login
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

export default Register;