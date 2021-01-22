import React from 'react'
import {Link} from 'react-router-dom'

// @material-ui imports
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

const TAX_RATE = 0.07

const useStyles = makeStyles({
  tableContainer: {
    margin: '0px 0px 15px 0px'
  },
  table: {
    alignContent: 'start'
  }
})

function ccyFormat(num) {
  return `$ ${num.toFixed(2)}`
}

export default function SpanningTable(props) {
  const classes = useStyles()
  const {cartDetails, totalPrice, handleChange} = props
  const invoiceTaxes = TAX_RATE * totalPrice
  const invoiceTotal = invoiceTaxes + totalPrice

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              <h3>DETAILS</h3>
            </TableCell>
            <TableCell align="left">
              <h3>PRICE</h3>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <h3>Product</h3>
            </TableCell>
            <TableCell align="right">
              <h3>Qty.</h3>
            </TableCell>
            <TableCell align="right">
              <h3>Unit Price</h3>
            </TableCell>
            <TableCell align="right">
              <h3>Sum</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartDetails.map(mask => (
            <TableRow key={mask.name}>
              <Link to={`/masks/${mask.id}`}>
                <TableCell>{mask.name}</TableCell>
              </Link>
              <TableCell align="right">
                {/* {mask.quantity} */}
                <TextField
                  type="number"
                  size="small"
                  align="right"
                  id={mask.id}
                  defaultValue={mask.quantity}
                  InputProps={{
                    inputProps: {
                      max: 100,
                      min: 0
                    }
                  }}
                  onChange={handleChange}
                  InputLabelProps={{shrink: true}}
                />
              </TableCell>
              <TableCell align="right">{ccyFormat(mask.price)}</TableCell>
              <TableCell align="right">
                {ccyFormat(mask.price * mask.quantity)}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(totalPrice)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
