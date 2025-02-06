import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const {token, setToken,backendURL, navigate} = useContext(ShopContext);
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      if(currentState === "Sign Up"){
        const response = await axios.post(backendURL + "/api/user/register",  {username, email, password} )
        if(response.data.success){
          console.log(response.data.token)
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }else{
        const response = await axios.post(backendURL + "/api/user/login", {email,password})
        if(response.data.success){
          console.log(response.data.token)
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(token){
      navigate("/login")
      navigate("/")
    }
  },[token])

  // useEffect(() => {
  //   if (token && token !== "null" && token !== "undefined") {
  //     navigate("/");
  //   }
  // }, [token]);
  
  
  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === "Login" ? ""  : <input className='w-full px-3 py-2 border border-gray-800' onChange={(e) => setUsername(e.target.value)} value={username} type="text" required placeholder='User Name' />}
      <input className='w-full px-3 py-2 border border-gray-800' onChange={(e) => setEmail(e.target.value)} value={email} type="text" required placeholder='Email' />
      <input className='w-full px-3 py-2 border border-gray-800' onChange={(e) => setPassword(e.target.value)} value={password} type="text" required placeholder='Password' />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>forgot your password?</p> 
        {currentState === "Login" ? 
        <p className='cursor-pointer' onClick={() => setCurrentState("Sign Up ")}>Sign Up</p> :
        <p className='cursor-pointer' onClick={() => setCurrentState("Login")}>Login</p>}
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4' >{currentState === "Sign Up" ? "Sign Up" : "Sign In"}</button>
    </form>
  )
}

export default Login