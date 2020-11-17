import React from 'react'
import {Link} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import {
  BottomNavigation,
  BottomNavigationAction,
  Button
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/Info'
import ContactsIcon from '@material-ui/icons/Contacts'
import FacebookIcon from '@material-ui/icons/Facebook'

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
      className="footer"
      position="fixed"
      alignitems="center"
      color="transparent"
      style={{top: 'auto', bottom: 0}}
    >
      <BottomNavigation
        alignitems="center"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          component={Link}
          to="/about"
          label="About Us"
          icon={<InfoIcon />}
        />

        <BottomNavigationAction
          component={Link}
          to="/contact"
          label="Contact"
          icon={<ContactsIcon />}
        />

        <BottomNavigationAction
          component={Link}
          to="/facebook"
          label="FaceBook"
          icon={<FacebookIcon />}
        />
      </BottomNavigation>
    </AppBar>
  )
}

export default Footer
