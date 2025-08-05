import React from 'react'

const Button = ({title, classContainer, onClick}) => {
  return (
    <button className={`${classContainer}`} onClick={onClick}>
        {title}
    </button>
  )
}

export default Button