import React, { useContext, useState } from 'react'
import { closeIcon, right } from '../Assets/Images'
import { AppContext } from '../context/AppContext'

function Login() {
  const [state,setState] = useState("login");
  const [username,setUserName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {navigate} = useContext(AppContext)
  


  const handleForm = (e) => {
    e.preventDefault();
    console.log({username,email,password});
  }
 


  return (
    <div onClick={()=> navigate("/")} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
      <form onSubmit={handleForm} onClick={(e)=> e.stopPropagation()} className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
        <img src={right} alt="registrationImage" className='w-1/2 rounded-xl hidden md:block' />

        <div  className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
          <img onClick={()=> navigate("/")} src={closeIcon} alt="closeIcon" className='absolute top-4 right-4 h-4 w-4 cursor-pointer'/>
          <p className='text-2xl font-semibold mt-6'>User {state === "login" ? "Login" : "Registration"} Form</p>
            {/* - - - - - - - - - username - - - - - - - - - - -  */}
          {state !== "login" && (<div className='w-full mt-4'>
              <label htmlFor="username" className='text-gray-500 font-medium'>
                Username
              </label>
              <input onChange={(e)=> setUserName(e.target.value)} type="text" id='username' placeholder='Type here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light transition' required />
          </div>)}
           {/* - - - - - - - - - Email (Email) - - - - - - - - - - -  */}
          <div className='w-full mt-4'>
              <label htmlFor="Email" className='text-gray-500 font-medium'>
                Email
              </label>
              <input onChange={(e)=> setEmail(e.target.value)} type="text" id='Email' placeholder='Type here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light transition' required />
          </div>  
           {/* - - - - - - - - - Password - - - - - - - - - - -  */}
          <div className='w-full mt-4'>
              <label htmlFor="apassword" className='text-gray-500 font-medium'>
                Password
              </label>
              <input onChange={(e) => setPassword(e.target.value)} type="text" id='apassword' placeholder='Type here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light transition' required />
          </div>  
            <button className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6'>{state === "login" ? "Login" : "Register"}</button>
          <p className='text-left w-full text-sm'>
            {state === "login" ? "Don't has an account" : "has alread an account"} {" "}
            <span onClick={()=> setState(state === "login" ? "register" : "login")} className='text-blue-500 cursor-pointer'>{state === "login" ? "Register here" : "login here"}</span>
          </p>
        </div>
      </form>

    </div>
  )
}

export default Login