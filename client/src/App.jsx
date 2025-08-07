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

function App() {

  // check if the route is an admin route
  const isAdminRoute = useLocation().pathname.includes('/admin')

  return (
    <>
      <Toaster />
      {/* if the route is not an admin route, show the navbar */}
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/movie/:id/:date' element={<SeatLayout />} />
        <Route path='/my-booking' element={<MyBookings />} />
        <Route path='/favorite' element={<Favorite />} />
      </Routes>
      {/* if the route is not an admin route, show the footer */}
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
