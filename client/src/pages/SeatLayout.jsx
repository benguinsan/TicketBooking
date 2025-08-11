import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { dummyShowsData, dummyDateTimeData } from '../assets/assets'
import Loading from '../components/Loading'
import timeFormat from '../lib/timeFormat'
import { ClockIcon } from 'lucide-react'

const SeatLayout = () => {
  const {id, date} = useParams()
  const navigate = useNavigate()

  const [selectedSeat, setSelectedSeat] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)

  console.log(show)
  
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

  useEffect(() => {
    getShow()
  },[])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50 items-center justify-center'>
      {/* Available timings */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6 text-gray-300'>Available Timings</p>
        <div>
          {show.dateTime[date].map((item) => (
            <div key={item.time} className='flex items-center gap-2 px-6 py-2'>
              <ClockIcon className='w-4 h-4'/>
            </div>
          ))}
        </div>
      </div>
      {/* Seat layout */}
      <div className=''>

      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout