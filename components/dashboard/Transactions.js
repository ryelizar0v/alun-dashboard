import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { useState } from "react"
import { Typography } from '@material-ui/core'

import getDeliveries from "../../services/dashboard/getDeliveries"
import cancelDelivery from "../../services/dashboard/cancelDelivery"

import styles from "../../css/dashboard/table.module.css"

export default function Transactions(props) {

  const { deliveries, updateDeliveries, showDetails, getDetails } = props
  const [cancelledDelivery, setCancelledDelivery] = useState(null)

  const [open, setOpen] = useState(false)

  const handleClickOpen = (a) => {
    setOpen(true)
    setCancelledDelivery(a)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [selected, setSelected] = useState([])

  const handleSelectRow = (e, number) => {
    const selectedIndex = selected.indexOf(number)
    let newSelected = []

    if (selectedIndex === -1) newSelected.push(number)
    setSelected(newSelected)
  }

  const isSelected = (number) => { return selected.indexOf(number) !== -1 }

  return <>
    <Typography variant="h5" gutterBottom><strong>Transaction History</strong></Typography>

    <div className={styles.table} >
      {deliveries?.map((row) => (
        <div key={row.deliveryId}
          className={`${styles.row} ${isSelected(row.trackingNumber) ? styles.selected : ""}`}
        >
          <div className={styles.cell}
            onClick={(e) => {
              getDetails(row)
              handleSelectRow(e, row.trackingNumber)
              showDetails(isSelected(row.trackingNumber))
            }}
          >
            <strong>{row.trackingNumber}</strong>
          </div>
          <div className={styles.cell} align="center">
            {row.receiverAddress}
          </div>
          <div className={styles.cell} align="center">
            {row.createdAt}
          </div>
          <div className={styles.cell} align="center">
            <span className={styles.status}>{row.status}</span>
          </div>
          <div className={styles.cell} align="right">
            <Button variant="outlined" color="primary"
              disabled={row.status == "Cancelled" ? true : false}
              onClick={() => handleClickOpen(row.deliveryId)}
            >Cancel</Button>
          </div>
        </div>

      ))}
    </div>

    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Cancel delivery"}</DialogTitle>
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