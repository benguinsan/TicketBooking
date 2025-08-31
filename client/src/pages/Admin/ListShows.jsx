import { useState, useEffect } from 'react'
import { dummyShowsData } from '../../assets/assets'
import Title from '../../components/Admin/Title'
import Loading from '../../components/Loading'
import dateFormat from '../../lib/dateFormat'
import { useAppContext } from '../../context/AppContext'

const ListShows = () => {
    const {axios, getToken, user, image_base_url} = useAppContext()

    const currency = import.meta.env.VITE_CURRENCY

    const [shows, setShows] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    console.log(shows)

  const getAllShows = async () => {
    try {
        const {data} = await axios.get("/api/admin/all-shows", {
            headers: {
                Authorization: `Bearer ${await getToken()}`
            }
        })

        if(data.success){
            setShows(data.shows)
            setIsLoading(false)
        } else {
            toast.error(data.message)
        }

    } catch (error) {
        console.log("Error fetching shows", error)
        toast.error("An error occurred. Please try again")
    }
  }

  useEffect(() => {
    if(user){
        getAllShows()
    }
  },[user])

    return !isLoading ? (
        <>
            <Title textFirst='List' textLast='Shows'/>
            <div className='max-w-4xl mt-6 overflow-x-auto'>
                <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
                    {/* Table Header */}
                    <thead>
                        <tr className='bg-primary/20 text-left text-white'>
                            <th className='p-2 font-medium pl-5'>Movie Name</th>
                            <th className='p-2 font-medium'>Show Time</th>
                            <th className='p-2 font-medium'>Total Bookings</th>
                            <th className='p-2 font-medium'>Earnings</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody className='text-sm font-light'>
                        {shows.map((show,index) => (
                            <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                                <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
                                <td className='p-2 min-w-45'>{dateFormat(show.showDateTime)}</td>
                                <td className='p-2 min-w-45'>{Object.keys(show.occupiedSeats).length}</td>
                                <td className='p-2 min-w-45'>{currency} {show.showPrice * Object.keys(show.occupiedSeats).length}</td>
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

export default ListShows