import { Button, Step, StepContent, StepLabel, Stepper, Typography } from "@material-ui/core"
import styles from "../css/dashboard.module.css"

export default function ShippingDetails() {
   return <>
      <Typography variant="h4"><strong>Shipping Details</strong></Typography>
      <Typography variant="h6"><strong>LK 1234 5678</strong></Typography>
      
      <div className={styles.shipmentActors}>
         <div style={{marginBottom: "1.5rem"}}>
            <Typography variant="overline">Sender</Typography>
            <Typography variant="h5"><strong>Cristina Tabag</strong></Typography>
            <Typography variant="subtitle1">San Miguel, Iriga City</Typography>
         </div>
         <div>
            <Typography variant="overline">Receiver</Typography>
            <Typography variant="h5"><strong>Neil Tuason</strong></Typography>
            <Typography variant="subtitle1">Ortigas Center, Pasig City</Typography>
         </div>
      </div>

      <div className={styles.shipmentStatus}>
         <Stepper activeStep={0} orientation="vertical">
            <Step key={1} expanded>
               <StepLabel>
                  <Typography variant="h6"><strong>Picked up</strong></Typography>
               </StepLabel>
               <StepContent>
                  <Typography variant="subtitle1">Iriga City, Camarines Sur</Typography>
               </StepContent>
            </Step>
            <Step key={2} expanded>
               <StepLabel>
                  <Typography variant="h6"><strong>In Transit</strong></Typography>
               </StepLabel>
               <StepContent>
                  <Typography variant="subtitle1">Naga City, Camarines Sur</Typography>
               </StepContent>
            </Step>
            <Step key={3} expanded>
               <StepLabel>
                  <Typography variant="h6"><strong>Delivered</strong></Typography>
               </StepLabel>
               <StepContent>
                  <Typography variant="subtitle1">Pasig City, Metro Manila</Typography>
               </StepContent>
            </Step>
         </Stepper>
      </div>

      <Button variant="contained" color="primary" size="large" fullWidth disableElevation>
         <Typography variant="h6">Print Waybill</Typography>
      </Button>
   </>
}