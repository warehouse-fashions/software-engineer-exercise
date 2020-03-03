import React from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      hover: false,
      burger: false
    }
    this.showDropDown = this.showDropDown.bind(this)
    this.hideDropDown = this.hideDropDown.bind(this)
  }
  showDropDown() {
    this.setState({ hover: true, burger: true })
    const dropdown = document.getElementById('nav-dropdown')
    dropdown.style.display = 'flex'
    dropdown.style.minHeight = '300px'
    dropdown.innerHTML =
      window.innerWidth < 800 ? (
        `<ul>
          <li>NEW IN</li>
          <li>CLOTHING</li>
          <li>SHOES AND ACCESSORIES </li>
          <li>SALE AND OFFERS</li>
        </ul>`
      ) : (
        `<h2>${event.target.name}</h2>`
      )
  }

  hideDropDown() {
    this.setState({ hover: false, burger: false })
    setTimeout(() => {
      const dropdown = document.getElementById('nav-dropdown')
      dropdown.style.display = 'none'
      dropdown.style.minHeight = '0px'
      dropdown.innerHTML = ''
    }, 500)
  }

  //function
  render() {
    console.log(this.state.hover)
    return (
      <nav>
        <div className='nav-icons'>
          {/* mobile */}
          <a href='#' onClick={this.state.burger ? this.hideDropDown : this.showDropDown}>
            <img className='mobile-burger icons' src='../../assets/ico/list.png'></img>
          </a>
          <a href='#'>
            <img className='mobile-search icons' src='../../assets/ico/search.png'></img>
          </a>
          {/* desktop */}
          <a href='#'>
            <img className='icons' src='../../assets/ico/basket.png'></img>
          </a>
          <a href='#'>
            <img className='icons' src='../../assets/ico/liked.png'></img>
          </a>
          <a href='#'>
            <img className='icons' src='../../assets/ico/profile.png'></img>
          </a>
        </div>
        <div className='nav'>
          <div className='logo' />
          <div className='nav-links'>
            <Link
              to=''
              onMouseOver={this.showDropDown}
              onMouseLeave={this.hideDropDown}
              name='New In'
            >
              New In
            </Link>
            <Link
              to=''
              onMouseOver={this.showDropDown}
              onMouseLeave={this.hideDropDown}
              name='Clothing'
            >
              Clothing
            </Link>
            <Link
              to=''
              onMouseOver={this.showDropDown}
              onMouseLeave={this.hideDropDown}
              name='Shoes and Accessories'
            >
              Shoes and Accessories
            </Link>
            <Link
              to=''
              onMouseOver={this.showDropDown}
              onMouseLeave={this.hideDropDown}
              name='Sales and Offers'
            >
              Sale and Offers
            </Link>
          </div>
          <div className='nav-search'>
            <input className='nav-search' type='text' placeholder='Search' />
          </div>
        </div>
      </nav>
    )
  }
}
