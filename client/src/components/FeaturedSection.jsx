import Button from "./Button"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import BlurCircle from "./BlurCircle"
import { dummyShowsData } from "../assets/assets"
import MovieCard from "./MovieCard"

const FeaturedSection = () => {
  const navigate = useNavigate()

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      {/* Header of movies card section */}
      <div className='relative flex items-center justify-between pt-20 pb-18'>
        <BlurCircle top="0" left="90%"/>
        <p className='text-grap-300 font-medium text-lg'>Now showing</p>
        <Button onClick={() => navigate("/movies")} title="View all" classContainer="group flex items-center gap-2 text-base text-gray-300 cursor-pointer" children={<ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5'/>}/>
      </div>

      {/* Movies card section */}
      <div className='flex flex-wrap max-sm:justify-center gap-8 mt-9'>
        {dummyShowsData.map((show) => (
          <MovieCard key={show._id} movie={show}/>
        ))}
      </div>

      {/* Bottom of movies card section */}
      <div className='flex items-center justify-center mt-20'>
        <Button onClick={() => {navigate("/movies"); scrollTo(0, 0)}} title="Show more" classContainer="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"/>
      </div>
    </div>
  )
}

export default FeaturedSection