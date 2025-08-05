import React from 'react'

const Button = ({title, classContainer}) => {
  return (
    <button className={`${classContainer}`}>
        {title}
    </button>
  )
}

export default Button