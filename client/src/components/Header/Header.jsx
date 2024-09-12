import React from 'react'
import "./Header.css"
import { Navigate } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-content">
        <h2>Order your favourite food here</h2>
        <p>
        "Feeling hungry? Order now and get delicious food delivered right to your door. With a wide range of tasty options, there's something for everyone. Enjoy the convenience and quality today!"</p>
        <a href="#explore-menu"><button>View Menu</button></a>
      </div>
      
    </div>
  )
}

export default Header
