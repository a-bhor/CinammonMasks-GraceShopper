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
    margin: '0px 100px 0px 100px'
  },
  table: {
    minWidth: 700,
    maxWidth: 1200,
    alignContent: 'start'
    // margin: '0px 100px 0px 100px',
    // marginRight: 'auto',
    // marginBottom: 'auto',
    /* padding: 100px; */
    // borderStyle: 'dotted',
    //    border-color: rgba(0,0,0,0.12);
  }
})

function ccyFormat(num) {
  return `${num.toFixed(2)}`
}

// function priceRow(qty, unit) {
//   return qty * unit
// }

// function createRow(desc, qty, unit) {
//   const price = priceRow(qty, unit)
//   return {desc, qty, unit, price}
// }

// function subtotal(items) {
//   return items.map(({price}) => price).reduce((sum, i) => sum + i, 0)
// }

// const rows = [
//   createRow('Paperclips (Box)', 100, 1.15),
//   createRow('Paper (Case)', 10, 45.99),
//   createRow('Waste Basket', 2, 17.99),
// ]

// const invoiceSubtotal = subtotal(rows)
// const invoiceTaxes = TAX_RATE * invoiceSubtotal
// const invoiceTotal = invoiceTaxes + invoiceSubtotal

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
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Sum</TableCell>
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
