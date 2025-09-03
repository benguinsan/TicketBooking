import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { SearchIcon, XIcon, MenuIcon, Scroll, TicketPlus } from 'lucide-react'
import Button from './Button'
import { useState } from 'react'

import { useUser, useClerk, UserButton } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const {favoritesMovies} = useAppContext()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Get User information => Null if not logged in/ Object if logged in
  const { user } = useUser()

  // Open Sign In / Sign Up Modal
  const { openSignIn } = useClerk()

  // Navigate to My Bookings Page
  const navigate = useNavigate()

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev)
  }
  
  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
        <Link to={"/"} className='max-md:flex-1'>
            <img src={assets.logo} alt="logo" className='w-36 h-auto' />
        </Link>

        {/* Menu items */}
        <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium
        max-md:text-lg z-50 flex flex-col md:flex-row items-center
        max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen
        min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border
        border-gray-300/20 overflow-hidden transition-[width] duration-300      
        ${isMenuOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

          <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={handleMenuToggle}/>
          
          <Link onClick={() => {scrollTo(0, 0); setIsMenuOpen(false)}} to={"/"} className='text-lg font-medium'>Home</Link>
          <Link onClick={() => {scrollTo(0, 0); setIsMenuOpen(false)}}  to={"/movies"} className='text-lg font-medium'>Movies</Link>
          <Link onClick={() => {scrollTo(0, 0); setIsMenuOpen(false)}}  to={"/"} className='text-lg font-medium'>Theaters</Link>
          <Link onClick={() => {scrollTo(0, 0); setIsMenuOpen(false)}}  to={"/"} className='text-lg font-medium'>Releases</Link>
          {favoritesMovies.length > 0 && <Link onClick={() => {scrollTo(0, 0); setIsMenuOpen(false)}}  to={"/favorite"} className='text-lg font-medium'>Favorites</Link>}
        </div>

        {/* Search & Login Button */}
        <div className='flex items-center gap-8'>
          <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer'/>
          {!user ? (
            <Button onClick={openSignIn} title="Login" classContainer="px-4 py-1 sm:px-7 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"/>       
          ):(
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>} onClick={() => navigate("/my-bookings")}/>
              </UserButton.MenuItems>
            </UserButton>
          )}
         
        </div>

        {/* Menu Icon */}
        <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={handleMenuToggle}/>
    </div>
  )
}

export default Navbar