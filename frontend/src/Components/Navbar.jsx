import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'



const Navbar = () => {
  const [visible,setVisible] = useState(false)
  const {setShowSearch,getCartCount, navigate, setToken , setCartItems ,isOpen, setIsOpen} = useContext(ShopContext);

  const logout = () => {
    navigate("/")
    localStorage.removeItem("token")
    setToken('')
    setCartItems({})
    setIsOpen(!isOpen)
  }

  return (
    <div className=' flex items-center justify-between px-5 font-medium mb-4'>
      <Link to={"/"}><img className='w-20' src={assets.logo} alt=""/></Link>
      <ul className=' hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink to={"/"} className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink  to={"/collection"}  className="flex flex-col items-center gap-1">
         <p>Collection</p>
          <hr  className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to={"/about"}  className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr  className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to={"/contact"}  className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr  className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="" className='w-5 cursor-pointer' />
        <div className='group relative'>
        <Link> <img onClick={() => setIsOpen(!isOpen) } src={assets.profile_icon} alt="" className='w-5 cursor-pointer'/></Link>

            <div className="relative">
              {isOpen && (
                <div className="absolute right-0 pt-4 w-36 bg-slate-100 text-gray-500 rounded shadow-lg">
                  <div className="flex flex-col gap-2 py-3 px-5">
                    <Link to="/login">
                      <p className="cursor-pointer hover:text-black">My Profile</p>
                    </Link>
                    <Link to="/order">
                      <p className="cursor-pointer hover:text-black">Orders</p>
                    </Link>
                    <p onClick={logout} className="cursor-pointer hover:text-black">
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
             
        </div>
        <Link to={"/cart"} className='relative'>
           <img src={assets.cart_icon} alt="" className='w-5 min-w-5 '/>
           <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden' />
      </div>
      {/* sidebar menu for sm screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex item-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink to={"/"} onClick={() => setVisible(false)} className='py-2 pl-6 border'>HOME</NavLink>
          <NavLink to={"/collection"} onClick={() => setVisible(false)} className='py-2 pl-6 border'>COLLECTION</NavLink>
          <NavLink to={'/about'} onClick={() => setVisible(false)} className='py-2 pl-6 border'>ABOUT</NavLink>
          <NavLink to={"/contact"} onClick={() => setVisible(false)} className='py-2 pl-6 border'>CONTACT</NavLink>
        </div>
      </div>
      </div>
  )
}

export default Navbar