import React, { useContext, useState } from 'react'
import { closeIcon, logo, menuIcon, profileIcon } from '../Assets/Images'
import { AppContext } from '../context/AppContext'
import { div, menu } from 'framer-motion/client';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

function Navbar() {
    const {userLoggedIn,setUserLoggedIn,navigate} = useContext(AppContext);
    const [active,setActive] = useState(false)


const NavLinks = [
    {name:"Home",path:"/"},
    {name:"projects",path:"/projects"},
    {name:"Dashboard",path:"/dashboard"}
]
  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-30  transition-all border-b-[0.1px solid red]  ">
        <img className="h-7 z-10" src={logo} alt="dummyLogoWhite" onClick={()=> navigate("/")} />
    <ul className="text-black md:flex hidden items-center gap-10">
        {NavLinks.map((link,index)=> (
            <NavLink key={index} to={link.path} className="hover:text-blue-500 transition">{link.name}</NavLink>
        ))}
    </ul>

    {userLoggedIn === false ? (<button onClick={()=>navigate("/login")} type="button" className="text-white cursor-pointer md:inline hidden text-sm hover:opacity-90 active:scale-95 transition-all w-40 h-11 rounded-full bg-blue-600 border-none ">
        Login
    </button>) : (
        <div className='relative group'>
            <img src={profileIcon} alt='user_profile' className='h-10 w-10 cursor-pointer' />
            <div onClick={()=>{
                toast.success("logged out successfully")
                return setUserLoggedIn(false);
            } } className='absolute lef-20 border px-5 rounded hover:bg-blue-500 hover:text-white text-black cursor-pointer hidden group-hover:block'>
                <p>logout</p>
            </div>
        </div>
    )}

    <button aria-label="menu-btn" type="button" className="menu-btn inline-block md:hidden active:scale-90 transition">
        <img src={active ? closeIcon : menuIcon} alt="menul_icon" className='cursor-pointer' onClick={()=>setActive(!active)} />
    </button>

    <div className={`absolute top-[70px] left-0 w-full bg-gradient-to-r from-indigo-50 to-violet-50 p-6 md:hidden ${active ? "block" : "hidden"}`}>
        <ul className="flex flex-col space-y-4 text-white text-lg transition-all duration-1000">
        {NavLinks.map((link,index)=> (
        <NavLink key={index} to={link.path} className="text-black hover:text-blue-500 transition">{link.name}</NavLink>
    ))}
        </ul>
        <button type="button" className="text-white mt-6 inline md:hidden text-sm hover:opacity-90 active:scale-95 transition-all w-40 h-11 rounded-full border bg-blue-600 cursor-pointer">
            {userLoggedIn ? "logout" :  "login"}
        </button>
    </div>
</nav>
  )
}

export default Navbar