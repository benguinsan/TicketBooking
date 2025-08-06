import React from 'react'

const Button = ({title, classContainer, onClick, children}) => {
  return (
    <button className={`${classContainer}`} onClick={onClick}>
        {title}
        {children}
    </button>
  )
}

export default Button