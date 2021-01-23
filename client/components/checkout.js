import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {postCheckout} from '../store/checkout'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
    this.submitOrder = this.submitOrder.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  submitOrder(evt) {
    evt.preventDefault()
    console.log('THIS!!!--->', this)
    let {address1, address2, city, state, zip, country} = this.state
    this.props.placeOrder({
      shippingAddress: `${address1}, ${address2}, ${city}, ${state}, ${zip}, ${country}`
    })
    this.props.history.push('/ordercomplete')
  }

  render() {
    let {
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zip,
      country
    } = this.state
    return (
      <div className="checkoutContainer">
        <React.Fragment>
          <p />
          <div className="shipping">SHIPPING ADDRESS</div>
          <p />
          <Typography variant="h3" gutterBottom />
          <Grid container spacing={6}>
            <Grid item xs={12} sm={5}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                onChange={this.handleChange}
                value={firstName}
                fullWidth
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                onChange={this.handleChange}
                value={lastName}
                fullWidth
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                onChange={this.handleChange}
                value={address1}
                fullWidth
                autoComplete="shipping address-line1"
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                onChange={this.handleChange}
                value={address2}
                fullWidth
                autoComplete="shipping address-line2"
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                onChange={this.handleChange}
                value={city}
                fullWidth
                autoComplete="shipping address-level2"
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                onChange={this.handleChange}
                value={state}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip/Postal code"
                onChange={this.handleChange}
                value={zip}
                fullWidth
                autoComplete="shipping postal-code"
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                onChange={this.handleChange}
                value={country}
                fullWidth
                autoComplete="shipping country"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveAddress" value="yes" />
                }
                label="Use this address for payment details"
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <div className="payment">PAYMENT</div>
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                required
                id="cardName"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                required
                id="cardNumber"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                required
                id="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                required
                id="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveCard" value="yes" />
                }
                label="Save credit card details for next time"
              />
            </Grid>
            <p />
            <p />
            <p />
            <Button
              type="submit"
              onClick={this.submitOrder}
              variant="contained"
              color="secondary"
              style={{
                maxWidth: '200px',
                maxHeight: '100px',
                minWidth: '150px',
                minHeight: '50px',
                fontSize: '16px'
              }}
              className="place-order"
            >
              Place order
            </Button>
          </Grid>
        </React.Fragment>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  placeOrder: address => dispatch(postCheckout(address))
})

export default connect(null, mapDispatchToProps)(Checkout)
