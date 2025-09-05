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
import Button from '../components/Button'
import { ArrowRightIcon } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const SeatLayout = () => {
  const {axios, getToken, user} = useAppContext()
  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]

  const {id, date} = useParams()
  const navigate = useNavigate()

  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)
  const [occupiedSeats, setOccupiedSeats] = useState([])
  
  // Get the show and date time data
  const getShow = async () => {
    try {
      const {data} = await axios.get(`/api/show/${id}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })

      if(data.success) {
        setShow(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Get occupied seats
  const getOccupiedSeats = async () => {
    try {
      const {data} = await axios.get(`/api/booking/seats/${selectedTime.showId}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })

      if(data.success) {
        setOccupiedSeats(data.occupiedSeats)
      } else {
        toast.error(data.message)
      }

    } catch(error) {
      console.log(error)
    }
  }

  // Handle seat click
  const handleSeatClick = (seatId) => {
    if(!selectedTime) return toast.error("Please select time first")

    if(!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast.error("You can only select up to 5 seats")
    }

    if(occupiedSeats.includes(seatId)) {
      return toast.error("This seat is already blocked")
    }

    // Check if the seat is already selected (includes()), if yes, remove it (filter()), if no, add it (spread operator)
    setSelectedSeats((prev) => prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId])
  }

  // Booking seats
  const bookTickets = async () => {
    try {
      if(!user) return toast.error("Please login to book tickets")

      if(!selectedTime || selectedSeats.length === 0) return toast.error("Please select time and seats first")
      
      const {data} = await axios.post('/api/booking/create-booking', {
        showId: selectedTime.showId,
        selectedSeats
      }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })

      if(data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message)
      }

    } catch(error) {
      console.log(error)
    }
  }

  // Render seats
  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({length: count}).map((_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <Button 
              key={seatId} 
              onClick={() => handleSeatClick(seatId)} 
              classContainer={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-primary text-white"} 
              ${occupiedSeats.includes(seatId) && "bg-primary/20 opacity-50"}
              `}
              title={seatId}
            />
          )
        })}
      </div>
    </div>
  )

  useEffect(() => {
    getShow()
  },[])

  useEffect(() => {
    if(selectedTime) {
      getOccupiedSeats()
    }
  },[selectedTime])

  
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
            <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
              {groupRows[0].map((row) => renderSeats(row))}
            </div>

            <div className='grid grid-cols-2 gap-11'> 
              {groupRows.slice(1).map((group, index) => (
                <div key={index}>
                  {group.map((row) => renderSeats(row))}
                </div>
              ))}
            </div>
          </div>

          {/* Process checkout */}
          <Button 
            title="Proceed to checkout" 
            children={<ArrowRightIcon strokeWidth={4} className='w-4 h-4'/>}
            classContainer="flex items-center justify-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95"
            onClick={bookTickets}
          />
          
        
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout