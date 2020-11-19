import { Button, Paper, Typography } from "@material-ui/core";

export default function ShippingDetails() {
   return <>
      <h1>Shipping Details</h1>
      <Paper elevation={4} className="shipment--actors">
         <div style={{marginBottom: "1.5rem"}}>
            <Typography variant="overline">Sender</Typography>
            <Typography variant="h5">Cristina Tabag</Typography>
            <Typography variant="subtitle1">San Miguel, Iriga City</Typography>
         </div>
         <div>
            <Typography variant="overline">Receiver</Typography>
            <Typography variant="h5">Neil Tuason</Typography>
            <Typography variant="subtitle1">Ortigas Center, Pasig City</Typography>
         </div>
      </Paper>
      <Button variant="contained" color="primary">Print Waybill</Button>
   </>
}