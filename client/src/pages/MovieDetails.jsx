import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { StarIcon, PlayCircleIcon } from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import Button from '../components/Button'



const MovieDetails = () => {

  // Get the id from the url
  const {id} = useParams()

  // State to store the show and date time data
  const [show, setShow] = useState(null)

  // Get the show and date time data
  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id)
    setShow({
      movie: show,
      dateTime: dummyDateTimeData
    })
  }

  // Get the new show and date time data when the id changes
  useEffect(() => {
    getShow()
  },[id])

  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      {/* Main screen movie details */}
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img src={show.movie.poster_path} alt="image-show" className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover' />

        <div className='relative flex flex-col gap-3'>
          <BlurCircle top="50%" right='0px'/>
          <p className='text-primary'>ENGLISH</p>
          {/* Title of the movie */}
          <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
          {/* User rating */}
          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className='w-5 h-5 text-primary fill-primary' />
            {show.movie.vote_average.toFixed(1)} User rating
          </div>
          {/* Overview */}
          <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>
          {/* Duration and Genres */}
          <p className=''>{timeFormat(show.movie.runtime)} • {show.movie.genres.map(genre => genre.name).join(', ')} • {show.movie.release_date.split('-')[0]}</p>
          {/* Buttons watch trailer and buy ticket */}
          <div>

          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default MovieDetails