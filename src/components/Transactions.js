import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

import { Delivery } from "../data"

export default function Transactions() {
   return <>
      <h1>Transaction History</h1>
      <TableContainer>
      <Table aria-label="transaction-history">
        <TableBody>
          {Delivery.map((row) => (
            <TableRow key={row.transactionId}>
              <TableCell align="left"><strong>{row.transactionNumber}</strong></TableCell>
              <TableCell align="center">{row.destination}</TableCell>
              <TableCell align="center">{row.dateOfTransaction}</TableCell>
              <TableCell align="center">{row.transactionStatus}</TableCell>
              <TableCell align="right"><Button variant="contained" color="primary">Cancel</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </>
}