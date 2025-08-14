import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { dummyShowsData, dummyDateTimeData} from '../assets/assets'
import Loading from '../components/Loading'
import timeFormat from '../lib/timeFormat'
import { ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import { assets } from '../assets/assets'
import { toast } from 'react-hot-toast'

const SeatLayout = () => {
  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]

  const {id, date} = useParams()
  const navigate = useNavigate()

  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
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

  // Handle seat click
  const handleSeatClick = (seatId) => {
    if(!selectedTime) return toast.error("Please select time first")

    if(!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast.error("You can only select up to 5 seats")
    }

    // Check if the seat is already selected (includes()), if yes, remove it (filter()), if no, add it (spread operator)
    setSelectedSeats((prev) => prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId])

  }

  // Render seats
  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({length: count}).map((_, i) => {
          const seatId = `${row}-${i + 1}`;
          return (
            <button 
              key={seatId} 
              onClick={() => handleSeatClick(seatId)} 
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-primary text-white"}`}>
                {seatId}
            </button>
          )
        })}
      </div>
    </div>
  )

  useEffect(() => {
    getShow()
  },[])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      {/* Available timings */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6 text-gray-300'>Available Timings</p>
        <div className='mt-5 space-y-1'>
          {show.dateTime[date].map((item) => {
            return (
              <div key={item.time} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ? "bg-primary text-white" : "hover:bg-primary/20"}`} onClick={() => setSelectedTime(item)}>
                <ClockIcon className='w-4 h-4'/>
                <p className='text-sm'>{isoTimeFormat(item.time)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seat layout */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
          <BlurCircle top="-100px" left='-100px'/>
          <BlurCircle top="0" right='0'/>
          <h1 className='text-2xl font-semibold mb-4'>Select your Seat</h1>
          {/* Screen Img */}
          <img src={assets.screenImage} alt="screen" />
          <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>
          
          {/* Seat layout */}
          <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
            <div className=''>
              {groupRows[0].map((row) => renderSeats(row))}
            </div>
          </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout