import React from 'react'
import { dummyBookingData } from '../../assets/assets'
import { useState, useEffect } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/Admin/Title'

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllBookings = async () => {
    setBookings(dummyBookingData)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllBookings()
  },[])

    return !isLoading ? (
        <>
            <Title textFirst='List' textLast='Bookings'/>
        </>
    ) : (
        <Loading />
    )
}

export default ListBookings