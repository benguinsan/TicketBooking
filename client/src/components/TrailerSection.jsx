import React from 'react'
import { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import Button from './Button'
import BlurCircle from './BlurCircle'
import ReactPlayer from 'react-player'

const TrailerSection = () => {
    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])
    
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
            <p className='text-gray-300 text-lg font-medium max-w-[960px] mx-auto'>Trailers</p>
            {/* Video trailer */}
            <div className='relative mt-6'>
                <BlurCircle top="-100px" right='-100px'/>
                <ReactPlayer src={currentTrailer.videoUrl} controls={true} width="960px" height="540px" className="mx-auto max-w-full"/>
            </div>
            {/* List of trailers */}
            <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
                {dummyTrailers.map((trailer) => (
                    <div key={trailer.image} className='relative group-hover:not-hover:opacity-50 hover:-translate-y-1 transition duration-300 max-md:h-60 md:max-h-60 cursor-pointer'>
                        <img src={trailer.image} alt="trailer-thumbnail" className='rounded-lg cursor-pointer w-full h-full object-cover brightness-75' onClick={() => setCurrentTrailer(trailer)}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrailerSection