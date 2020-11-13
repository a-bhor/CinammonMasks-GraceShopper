import React from 'react'
import {Link} from 'react-router-dom'
import {RiFacebookBoxLine} from 'react-icons/ri'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'

export function Footer() {
  return (
    <div className="main-footer">
      <BottomNavigation>
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon />}
        />
        <Link to="/about">
          {' '}
          <RiFacebookBoxLine />About
        </Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/facebook">FaceBook</Link>
      </BottomNavigation>
    </div>
  )
}

export default Footer
