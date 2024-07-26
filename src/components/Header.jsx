import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import userIcon from '../assets/user.png'
import {Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../contants/Navigation';

const Header = () => {
  const location = useLocation()
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
  const [searchValue, setSearchValue] = useState(removeSpace)
  const navigate = useNavigate()

  

  useEffect(()=>{
    if(searchValue){
      navigate(`/search?q=${searchValue}`)
    }
  },[searchValue])

  const preventSubmit = (e)=>{
    e.preventDefault()
  }
  return (
    <header className='fixed bg-black w-full h-16 bg-opacity-60 z-40'>
      <div className="container mx-auto px-2 flex items-center h-full">
        <Link to={'/'}>
          <img src={logo} alt="logo" width={120} />
        </Link>

        <nav className='hidden lg:flex items-center gap-1 ml-5'>
          {
            navigation.map((item, index) => {
              return (
                <NavLink key={item.label} to={item.href}
                  className={({ isActive }) => `px-3 hover:text-neutral-300 ${isActive && "text-neutral-400"}`}>{item.label}</NavLink>
              )
            })
          }
        </nav>

        <div className='ml-auto flex items-center gap-5'>
          <form className='flex items-center' onSubmit={preventSubmit}>
            <input type="text" placeholder='Search...' className='bg-transparent outline-none border-none px-4 py-1 hidden lg:block' 
            onChange={(e) => setSearchValue(e.target.value)} 
            value={searchValue}
            />

            <button className='text-2xl text-white gap-3'>
              <IoSearchOutline />
            </button>
          </form>
          
          <div className='w-8 rounded-full overflow-hidden active:scale-50 transition-all cursor-pointer'>
            <img src={userIcon}
              alt="" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header