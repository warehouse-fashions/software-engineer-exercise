import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <div className='nav-icons'>
        <a href='#'><img className='icons' src='../../assets/ico/basket.png'></img></a>
        <a href='#'><img className='icons' src='../../assets/ico/liked.png'></img></a>
        <a href='#'><img className='icons' src='../../assets/ico/profile.png'></img></a>
      </div>
      <div className='nav'>
        <img
          className='logo'
          src='https://www.warehouse.co.uk/on/demandware.static/Sites-Warehouse-UK-Site/-/default/dweefb68b5/images/logo.svg'
        />
        <Link to=''>New In</Link>
        <Link to=''>Clothing</Link>
        <Link to=''>Shoes and Accessories</Link>
        <Link to=''>Sale and Offers</Link>
        <div className='nav-search'>
          <input 
            type='text' 
            placeholder='Search'
          />
        </div>
      </div>
    </nav>
  )
}

export default Nav
