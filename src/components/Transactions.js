import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

import { Delivery } from "../data"
import { useState } from "react"
import { Typography } from '@material-ui/core'

export default function Transactions() {

  const [selected, setSelected] = useState([])
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected)
    //alert(selectedIndex)
  }

  const isSelected = (id) => {
    return selected.indexOf(id) !== -1
  }

  return <>
    <Typography variant="h5" gutterBottom><strong>Transaction History</strong></Typography>
    <TableContainer>
      <Table aria-label="transaction-history">
        <TableBody>
          {Delivery.map((row) => (
            <TableRow key={row.id}
              tabIndex={-1}
              selected={isSelected(row.id)}
              onClick={(e) => handleClick(e, row.id)}
            >
              <TableCell align="left"><strong>{row.transactionNumber}</strong></TableCell>
              <TableCell align="center">{row.destination}</TableCell>
              <TableCell align="center">{row.dateOfTransaction}</TableCell>
              <TableCell align="center">{row.transactionStatus}</TableCell>
              <TableCell align="right"><Button variant="outlined" color="primary">Cancel</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
}