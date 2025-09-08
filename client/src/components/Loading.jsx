import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Loading = () => {
  const {nextUrl} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if(nextUrl) {
      setTimeout(() => {
        navigate('/' + nextUrl)
      }, 8000)
    }
  },[nextUrl])

  return (
    <div className='flex justify-center items-center h-[80vh]'>
        <div className='animate-spin rounded-full h-14 w-14 border-2 border-t-primary'/>
    </div>
  )
}

export default Loading