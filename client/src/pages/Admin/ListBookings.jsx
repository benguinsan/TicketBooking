import React from 'react'
import { dummyBookingData } from '../../assets/assets'
import { useState, useEffect } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/Admin/Title'
import dateFormat from '../../lib/dateFormat'
import { useAppContext } from '../../context/AppContext'

const ListBookings = () => {
    const {axios, getToken, user, image_base_url} = useAppContext()
    const currency = import.meta.env.VITE_CURRENCY

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllBookings = async () => {
   try {
    const {data} = await axios.get("/api/admin/all-bookings", {
        headers: {
            Authorization: `Bearer ${await getToken()}`
        }
    })

    if(data.success){
        setBookings(data.bookings)
        setIsLoading(false)
    } else {
        toast.error(data.message)
    }

   } catch(error){
    console.log("getAllBookings error:", error)
    toast.error("An error occurred. Please try again")
   }
  }

  useEffect(() => {
    if(user){
        getAllBookings()
    }
  },[user])

    return !isLoading ? (
        <>
            <Title textFirst='List' textLast='Bookings'/>
            <div className='max-w-4xl mt-6 overflow-x-auto'>
                <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
                    {/* Table Header */}
                    <thead>
                        <tr className='bg-primary/20 text-left text-white'>
                            <th className='p-2 font-medium pl-5'>User Name</th>
                            <th className='p-2 font-medium'>Movie Name</th>
                            <th className='p-2 font-medium'>Show Time</th>
                            <th className='p-2 font-medium'>Seats</th>
                            <th className='p-2 font-medium'>Amount</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody className='text-sm font-light'>
                       {bookings.map((item, index) => (
                        <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                            <td className='p-2 min-w-45 pl-5'>{item.user.name}</td>
                            <td className='p-2 min-w-45'>{item.show.movie.title}</td>
                            <td className='p-2 min-w-45'>{dateFormat(item.show.showDateTime)}</td>
                            <td className='p-2 min-w-45'>{Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(", ")}</td>
                            <td className='p-2 min-w-45'>{currency} {item.amount}</td>
                        </tr>
                       ))}
                    </tbody>
                </table>
            </div>
        </>
    ) : (
        <Loading />
    )
}

export default ListBookings