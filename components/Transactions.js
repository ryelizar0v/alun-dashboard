import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { useState } from "react"
import { Typography } from '@material-ui/core'

import getDeliveries from "../services/getDeliveries"
import cancelDelivery from "../services/cancelDelivery"

export default function Transactions(props) {

  const { deliveries, updateDeliveries } = props
  const [cancelledDelivery, setCancelledDelivery] = useState(null)

  const [open, setOpen] = useState(false)

  const handleClickOpen = (a) => {
    setOpen(true)
    setCancelledDelivery(a)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return <>
    <Typography variant="h5" gutterBottom><strong>Transaction History</strong></Typography>
    <TableContainer>
      <Table aria-label="transaction-history">
        <TableBody>
          {deliveries?.map((row) => (
            <TableRow key={row.deliveryId}
              tabIndex={-1}
            >
              <TableCell align="left"><strong>{row.trackingNumber}</strong></TableCell>
              <TableCell align="center">{row.receiverAddress}</TableCell>
              <TableCell align="center">{row.createdAt}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" color="primary"
                  disabled={row.status == "Cancelled" ? true : false}
                  onClick={() => handleClickOpen(row.deliveryId)}
                >Cancel</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Cancel delivery?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to cancel delivery?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={
          async () => {
            await cancelDelivery(cancelledDelivery)
            setOpen(false)
            const data = await getDeliveries()
            updateDeliveries(data.deliveries)
        }} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  </>
}