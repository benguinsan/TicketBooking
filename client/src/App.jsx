import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import MyBookings from './pages/MyBookings'
import SeatLayout from './pages/SeatLayout'
import Favorite from './pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Layout from './pages/Admin/Layout'
import Dashboard from './pages/Admin/Dashboard'
import AddShows from './pages/Admin/AddShows'
import ListShows from './pages/Admin/ListShows'
import ListBookings from './pages/Admin/ListBookings'
import { useAppContext } from './context/AppContext'
import { SignIn } from '@clerk/clerk-react'

function App() {

  // check if the route is an admin route
  const isAdminRoute = useLocation().pathname.includes('/admin')

  const { user, isAdmin, isAdminLoading } = useAppContext();

  return (
    <>
      <Toaster />
      {/* if the route is not an admin route, show the navbar */}
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/favorite' element={<Favorite />} />
        {/* Admin routes */}
        {/* Need admin loading state to avoid flash of content */}
        <Route path='/admin/*' element={
          !user ? (
            <div className='min-h-screen flex items-center justify-center'>
              <SignIn fallbackRedirectUrl={"/admin"} />
            </div>
          ) : isAdminLoading ? (
            <div className='min-h-screen flex items-center justify-center'>
              <div className='text-center'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
                <p>Checking admin permissions...</p>
              </div>
            </div>
          ) : isAdmin ? (
            <Layout />
          ) : (
            <div className='min-h-screen flex items-center justify-center'>
              <div className='text-center'>
                <h2 className='text-xl font-semibold mb-2'>Access Denied</h2>
                <p className='text-gray-400'>You don't have permission to access this page.</p>
              </div>
            </div>
          )
        }>
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>
      {/* if the route is not an admin route, show the footer */}
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
