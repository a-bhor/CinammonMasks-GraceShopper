import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {ShoppingCart} from '@material-ui/icons'
import Badge from '@material-ui/core/Badge'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {withStyles} from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {logout} from '../store'

const Navbar = ({logOut, isLoggedIn, firstName, cart}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logOutClose = () => {
    logOut()
    handleClose()
  }

  const StyledBadge = withStyles(theme => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px'
    }
  }))(Badge)

  const items = Object.values(cart)

  const cartItems = items.reduce((accum, item) => {
    accum += item
    return accum
  }, 0)

  return (
    <div>
      <div className="appbar">
        <AppBar position="static" color="inherit" aria-label="menu">
          <Toolbar className="navbar">
            <nav>
              {/* Shop Header ........ */}
              {isLoggedIn ? (
                <Link to="/home">
                  <Button
                    color="inherit"
                    type="onSubmit"
                    className="cinnamon-header"
                  >
                    CINNAMON MASKS
                  </Button>
                </Link>
              ) : (
                <Link to="/">
                  <Button
                    color="inherit"
                    type="onSubmit"
                    className="cinnamon-header"
                  >
                    CINNAMON MASKS
                  </Button>
                </Link>
              )}

              <div className="iconsright">
                {isLoggedIn ? `Welcome, ${firstName}` : null}
                {/* Navbar Menu ........ */}
                {isLoggedIn ? (
                  <Link to="/home">
                    <Button
                      size="medium"
                      color="inherit"
                      type="onSubmit"
                      style={{
                        fontSize: '16px',
                        margin: '0 20px'
                      }}
                    >
                      <h4>MASKS</h4>
                    </Button>
                  </Link>
                ) : (
                  <Link to="/">
                    <Button
                      size="medium"
                      color="inherit"
                      type="onSubmit"
                      style={{
                        fontSize: '16px',
                        margin: '0 20px'
                      }}
                    >
                      <h4>MASKS</h4>
                    </Button>
                  </Link>
                )}

                {/* <Link to="/"><h4>MASKS</h4></Link> */}
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
                    <StyledBadge badgeContent={cartItems} color="secondary">
                      <ShoppingCart />
                    </StyledBadge>
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
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName,
    cart: state.cart
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
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string
}
