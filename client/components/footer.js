import React from 'react'
import {Link} from 'react-router-dom'
import {RiFacebookBoxLine} from 'react-icons/ri'

export function Footer() {
  return (
    <div className="main-footer">
      <Link to="/about">
        {' '}
        <RiFacebookBoxLine />About
      </Link>
      <Link to="/contact">Contact Us</Link>
      <Link to="/facebook">FaceBook</Link>
    </div>
  )
}

export default Footer
