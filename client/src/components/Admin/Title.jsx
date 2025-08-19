import React from 'react'

const Title = ({textFirst, textLast}) => {
  return (
    <h1 className={`font-medium text-2xl`}>
        {textFirst} <span className='underline text-primary'>
        {textLast} </span>
    </h1>  
  )
}

export default Title