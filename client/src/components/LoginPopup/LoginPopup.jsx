import React, { useContext, useEffect, useState } from 'react'
import "./LoginPopup.css"
import { GiCrossedSwords } from "react-icons/gi";
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"


const LoginPopup = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext)

  const [currState,setCurrState]=useState("Login");
   
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  });

  const onChangeHandler = (e) =>{
    const name= e.target.name;
    const value= e.target.value;
    setData(data=>({...data,[name]:value}))

  }

  const onLogin = async(e)=>{
    e.preventDefault()

    let newUrl = url;
    if(currState === "Login"){
      newUrl += "/login"
    }else{
      newUrl += "/register"
    }

    const response = await axios.post(newUrl,data)

    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          < GiCrossedSwords onClick={()=>setShowLogin(false)} className='login-popup-title-icon' />
        </div>
        <div className="login-popup-inputs">
          {currState==="Login"?<> </>: <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder='Your Name'  required/>}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email'  required/>
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder='Password'  required/>
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continue ,I agree to the terms of use & privacy policy</p>
        </div>
        {currState==="Login"?
        <p className='form-navigate-para'>Create a new account?<span onClick={()=>setCurrState("Sign Up")} className='form-navigate-span'>Click here</span></p>
        :<p className='form-navigate-para'>Already have an account ?<span onClick={()=>setCurrState("Login")} className='form-navigate-span'>Login here</span></p> 
        }
      </form>
    </div>
  )
}

export default LoginPopup
