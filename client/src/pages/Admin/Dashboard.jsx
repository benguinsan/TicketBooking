import React, { useState, useEffect } from 'react'
import { dummyDashboardData } from '../../assets/assets'
import { ChartBarIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UsersIcon } from 'lucide-react'
import Loading from '../../components/Loading'
import Title from '../../components/Admin/Title'
import BlurCircle from '../../components/BlurCircle'
import dateFormat from '../../lib/dateFormat'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'

const Dashboard = () => {
    const {axios, getToken, user, image_base_url, refreshDashboard} = useAppContext()
    const currency = import.meta.env.VITE_CURRENCY
    
    const [dashboardData, setDashboardData] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        activeShows: [],
        totalUsers: 0,
    })

    const dashboardCards = [
        {title: "Total Bookings", value: dashboardData.totalBookings, icon: <ChartBarIcon/>},
        {title: "Total Revenue", value: currency + dashboardData.totalRevenue || '0', icon: <CircleDollarSignIcon/>},
        {title: "Active Shows", value: dashboardData.activeShows.length || '0', icon: <PlayCircleIcon/>},
        {title: "Total Users", value: dashboardData.totalUsers || '0', icon: <UsersIcon/>},
    ]

    const [isLoading, setIsLoading] = useState(true)

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.get("/api/admin/dashboard", {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            if(data.success){
                setDashboardData(data.dashboardData)
            } else {
                toast.error(data.message)
            }

        } catch(error){
            console.log("fetchDashboardData error:", error)
            toast.error("Failed to fetch dashboard data")
        } finally {
            setIsLoading(false)
        }
    }

    // UseEffect to fetch dashboard data
    useEffect(() => {
        if(user){
            fetchDashboardData() 
        }
    },[user])

    // Expose refresh function to context
    useEffect(() => {
        if (refreshDashboard) {
            refreshDashboard.current = fetchDashboardData
        }
    }, [refreshDashboard])

    return !isLoading ? (
        <>
            <Title textFirst='Admin' textLast='Dashboard'/>

            {/* Dashboard Cards (Total Bookings, Total Revenue, Active Shows, Total Users) */}
            <div className="relative flex flex-wrap gap-4 mt-6">
                <BlurCircle top="-100px" left="0"/>
                <div className='flex flex-wrap gap-4 w-full'>
                    {dashboardCards.map((card, index) => (
                        <div key={index} className='flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full'>
                            <div className=''>
                                <h1 className='text-sm'>{card.title}</h1>
                                <p className='text-xl font-medium mt-1'>{card.value}</p>
                            </div>
                            <div className='w-6 h-6'>
                                {card.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Shows card */}
            <p className='mt-10 text-lg font-medium'>Active Shows</p>
            <div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl'>
                <BlurCircle top="100px" left="-10%"/>
                {dashboardData.activeShows.map((show) => (
                    <div key={show._id} className='w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300'>
                        <img src={image_base_url + show.movie.poster_path} alt={show.name} className='w-full h-60 object-cover'/>
                        <p className='font-medium p-2 truncate'>{show.movie.title}</p>
                        <div className='flex items-center justify-between px-2'>
                            <p className='text-lg font-medium'>{currency} {show.showPrice}</p>
                            <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
                                <StarIcon className='w-4 h-4 text-primary fill-primary'/>
                                {show.movie.vote_average.toFixed(1)}
                            </p>
                        </div>
                        <p className='text-sm text-gray-500 px-2 pt-2'>{dateFormat(show.showDateTime)}</p>
                    </div>

                ))}
            </div>
        </>
    ) : <Loading />
    
}

export default Dashboard