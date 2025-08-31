import React from 'react'

const Button = ({title, classContainer, onClick, children, disabled}) => {
  return (
    <button className={`${classContainer} ${disabled ? "" : ""}`} onClick={onClick} disabled={disabled}>
        {title}
        {children}
    </button>
  )
}

export default Button