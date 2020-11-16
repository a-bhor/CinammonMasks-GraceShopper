import React from 'react'
import {Link} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/Info'
import ContactsIcon from '@material-ui/icons/Contacts'
import FacebookIcon from '@material-ui/icons/Facebook'

// export function Footer() {
//   return (
//     <div className="main-footer">
//       <Link to="/about">
//         {' '}
//         <RiFacebookBoxLine />About
//       </Link>
//       <Link to="/contact">Contact Us</Link>
//       <Link to="/facebook">FaceBook</Link>

//     </div>
//   )
// }

const useStyles = makeStyles({
  root: {
    width: 500
  }
})

export function Footer() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <AppBar
      position="fixed"
      color="transparent"
      style={{top: 'auto', bottom: 0}}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="About Us" icon={<InfoIcon />} />
        <BottomNavigationAction label="Contact" icon={<ContactsIcon />} />
        <BottomNavigationAction label="FaceBook" icon={<FacebookIcon />} />
      </BottomNavigation>
    </AppBar>
  )
}

export default Footer
