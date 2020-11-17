import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ShoppingCart from '@material-ui/icons/shoppingcart'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {logout} from '../store'

const Navbar = ({logOut, isLoggedIn}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    console.log('event.currentTarget ', event.currentTarget)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logOutClose = () => {
    logOut()
    handleClose()
  }

  return (
    <div>
      <div className="appbar">
        <AppBar position="static" color="inherit" aria-label="menu">
          <Toolbar className="navbar">
            <nav>
              {/* Shop Header ........ */}
              <Link to="/">
                <Button
                  color="inherit"
                  type="onSubmit"
                  className="cinnamon-header"
                >
                  CINNAMON MASKS
                </Button>
              </Link>
              <div>
                {/* Navbar Menu ........ */}
                <Button
                  aria-controls="navbar-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <AccountCircleIcon />
                </Button>
                <Menu
                  id="navbar-menu"
                  anchorEl={anchorEl}
                  getContentAnchorEl={null}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                  transformOrigin={{vertical: 'top', horizontal: 'center'}}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {isLoggedIn ? (
                    <MenuItem onClick={logOutClose}>Logout</MenuItem>
                  ) : (
                    <span>
                      <Link to="/login">
                        <MenuItem onClick={handleClose}>Login</MenuItem>
                      </Link>
                      <Link to="/signup">
                        <MenuItem onClick={handleClose}>Sign Up</MenuItem>
                      </Link>
                    </span>
                  )}
                  {/* Cart ............ */}
                  <Link to="/orders">
                    <MenuItem onClick={handleClose}>Order History</MenuItem>
                  </Link>
                </Menu>
                <Link to="/shopping-cart">
                  <Button>
                    <ShoppingCart />
                  </Button>
                </Link>
              </div>
            </nav>
            <hr />
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}
const mapDispatch = dispatch => {
  return {
    logOut() {
      dispatch(logout())
    }
  }
}
export default connect(mapState, mapDispatch)(Navbar)
/**
 * PROP TYPES
 */
Navbar.propTypes = {
  logOut: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
