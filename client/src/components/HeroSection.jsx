import React from 'react'
import { assets } from '../assets/assets'
import { CalendarIcon, ClockIcon, ArrowRight} from 'lucide-react'
import Button from './Button'

const HeroSection = () => {
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen' style={{ backgroundImage: `url(${assets.backgroundImage})` }}>
        {/* Logo */}
        <img src={assets.marvelLogo} alt="background" className='max-h-11 lg:h-11 mt-20'/>

        {/* Title */}
        <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Guadians <br/>of the Galaxy</h1>

        {/* Description */}
        <div className='flex items-center gap-4 text-gray-300'>
            <span>Action | Adventure | Sci-Fi</span>
            <div className='flex items-center gap-3'>
                <CalendarIcon className='w-4.5 h-4.5'/> 2018
                <ClockIcon className='w-4.5 h-4.5'/> 2h 8m
            </div>
        </div>
        <p className='max-w-md text-gray-300'>
            In a post-apocalyptic world where cities ride on wheels and comsume each other to survive, two people meet in London and try to stop a conspiracy.
        </p>
        <Button title="Explore Movie" classContainer='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer' >
            <ArrowRight className='w-5 h-5' />
        </Button>
    </div>
  )
}

export default HeroSection  