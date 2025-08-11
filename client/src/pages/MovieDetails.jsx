import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { StarIcon, PlayCircleIcon, HeartIcon} from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import Button from '../components/Button'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'




const MovieDetails = () => {

  const navigate = useNavigate()

  // Get the id from the url
  const {id} = useParams()

  // State to store the show and date time data
  const [show, setShow] = useState(null)

  // Get the show and date time data
  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id)
    if(show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      })
    }
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
          <div className='flex items-center flex-wrap gap-4 mt-4'>
            <Button 
              title="Watch Trailer" 
              classContainer="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95" 
              children={<PlayCircleIcon className='w-5 h-5' />} />
            <Button 
              title="Buy Ticket"
              // Event to scroll to the data select section
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('dateSelect').scrollIntoView({ behavior: 'smooth' });
              }}
              classContainer="flex items-center gap-2 px-7 py-3 text-sm bg-primary text-white hover:bg-primary/80 transition rounded-md font-medium cursor-pointer active:scale-95" 
            />
            <Button classContainer="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95" children={<HeartIcon className='w-5 h-5' />} />
          </div>
        </div>
      </div>
      {/* Your favorite cast */}
      <p className='text-lg font-medium mt-20 text-gray-300'>
        Your Favorite Cast
      </p>
      <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
        <div className='flex items-center gap-4 w-max px-4'>
            {show.movie.casts.slice(0,12).map((cast, index)=> (
              <div key={index} className='flex flex-col items-center text-center gap-2'>
                <img src={cast.profile_path} alt="cast-image" className='h-20 md:h-20 rounded-full aspect-square object-cover' />
                <p className='text-sm text-gray-400'>{cast.name}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Showtimes */}
      <DateSelect dateTime={show.dateTime} id={id} />

      {/* You may also like */}
      <p className='text-lg font-medium mt-20 mb-8 text-gray-300'>
        You May Also Like
      </p>
      <div className='flex flex-wrap max-sm:justify-center gap-4 gap-8'>
        {dummyShowsData.slice(0,4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <div className='flex justify-center mt-20'>
        <Button onClick={() => {navigate('/movies'); scrollTo(0,0)}} title="Show more" classContainer="bg-primary hover:bg-primary-dull text-white px-10 py-3 text-sm font-medium rounded-md cursor-pointer active:scale-95" />
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default MovieDetails