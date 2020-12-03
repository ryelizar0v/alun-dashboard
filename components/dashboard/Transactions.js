import { useState } from "react"
import { Typography } from '@material-ui/core'
import dayjs from "dayjs"

import styles from "../../css/dashboard/table.module.css"

export default function Transactions(props) {

  const { deliveries, showDetails, getDetails } = props

  const [selected, setSelected] = useState([])

  const handleSelectRow = (e, number) => {
    const selectedIndex = selected.indexOf(number)
    let newSelected = []
    if (selectedIndex === -1) newSelected.push(number)
    setSelected(newSelected)
  }

  const isSelected = (number) => { return selected.indexOf(number) !== -1 }

  return <>
    <div className={styles.header}>
      <Typography variant="h5"><strong>Transaction History</strong></Typography>
    </div>
    <div className={styles.table} >
      {deliveries?.map((row) => (
        <div 
          key={row.deliveryId}
          className={`${styles.row} ${isSelected(row.trackingNumber) ? styles.selected : ""}`}
        >
          <div 
            className={styles.cell}
            onClick={(e) => {
              getDetails(row)
              handleSelectRow(e, row.trackingNumber)
              showDetails(isSelected(row.trackingNumber))
            }}
          >
            <strong>{row.trackingNumber}</strong>
          </div>
          <div className={styles.cell} >
            {row.receiverAddress}
          </div>
          <div className={styles.cell} >
            {dayjs(row.createdAt).format("MMMM D, YYYY h:mm:ss A")}
          </div>
          <div className={styles.cell} >
            <div className={`${styles.status}
              ${row.status == "Cancelled" ? styles.cancelled
                : row.status == "In Transit" ? styles.inTransit
                : row.status == "Pending" ? styles.pending
                : row.status == "Picked Up" ? styles.pickedUp
                : styles.delivered
              }
            `}>
              {row.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
}