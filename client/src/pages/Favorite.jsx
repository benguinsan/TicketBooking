import {dummyShowsData} from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'

const Favorite= () => {
  const {favoritesMovies} = useAppContext()

  return favoritesMovies.length > 0 ? ( 
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-screen[80vh]'>
      <BlurCircle top="50%" right='0px'/>
      <BlurCircle top="20%" right='80%'/>
      <h1 className='text-lg font-medium my-4 text-gray-300'>Your Favorite Movies</h1>
      <div className='flex flex-wrap max-sm:justify-center gap-8 mt-9'>
        {favoritesMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie}/>
        ))}
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold text-gray-300'>No movies found</h1>
    </div>
  )
}

export default Favorite