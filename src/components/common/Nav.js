import React from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      hover: false
    }
    this.showDropDown = this.showDropDown.bind(this)
    this.hideDropDown = this.hideDropDown.bind(this)
  }
  showDropDown() {
    this.setState({ hover: true })
    const dropdown = document.getElementById('nav-dropdown')
    dropdown.style.display = 'flex'
    dropdown.style.minHeight = '300px'
    dropdown.innerHTML = `<h2>${event.target.name}</h2>`
  }
  hideDropDown() {
    this.setState({ hover: false })
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
          <img
            className='logo'
            src='https://www.warehouse.co.uk/on/demandware.static/Sites-Warehouse-UK-Site/-/default/dweefb68b5/images/logo.svg'
          />
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
          <div className='nav-search'>
            <input type='text' placeholder='Search' />
          </div>
        </div>
      </nav>
    )
  }
}
