import { Button, Step, StepContent, StepLabel, Stepper, Typography,
   Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider 
} from "@material-ui/core"
import styles from "../../css/dashboard/shipment.module.css"
import { useState } from "react"
import cancelDelivery from "../../services/dashboard/cancelDelivery"
import getDeliveries from "../../services/dashboard/getDeliveries"

export default function ShippingDetails(props) {

   const { data, updateDeliveries, show } = props

   const [openDialog, setOpenDialog] = useState(false)
   const [deliveryToCancel, setDeliveryToCancel] = useState(null)
   //const [cancelled, setCancelled] = useState(false)
   const handleOpenDialog = () => setOpenDialog(true)
   const handleCloseDialog = () => setOpenDialog(false)

   const handleCancelDelivery = async () => {
      show(false)
      const response = await cancelDelivery(deliveryToCancel)
      //if (response.success) setCancelled(true)
      handleCloseDialog()
      const data = await getDeliveries()
      updateDeliveries(data.deliveries)
   }

   return <>
      <Typography variant="h4">
         <strong>Shipping Details</strong>
      </Typography>
      <Typography variant="h6">
         <strong>{data.trackingNumber}</strong>
      </Typography>
      
      <div className={styles.transactorBox}>
         <div className={styles.transactor}>
            <div className={styles.sender}>
               <Typography variant="subtitle1">
                  <strong>Sender</strong>
               </Typography>
            </div>
            <Typography variant="h5"><strong>{data.senderName}</strong></Typography>
            <Typography variant="subtitle1">{data.senderAddress}</Typography>
         </div>
         <Divider />
         <div className={styles.transactor}>
            <div className={styles.receiver}>
               <Typography variant="subtitle1">
                  <strong>Receiver</strong>
               </Typography>
            </div>
            <Typography variant="h5"><strong>{data.receiverName}</strong></Typography>
            <Typography variant="subtitle1">{data.receiverAddress}</Typography>
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
            <Step key={2}>
               <StepLabel>
                  <Typography variant="h6"><strong>In Transit</strong></Typography>
               </StepLabel>
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

      <div className={styles.actionButtons}>
         <Button variant="contained" 
            color="primary" 
            size="large" 
            fullWidth 
            disableElevation
            style={{
               marginBottom: "0.5rem"
            }}
            disabled={
               (data.status == "Cancelled") 
               ? true 
               : false
            }
         >
            <Typography variant="h6">Print Waybill</Typography>
         </Button>
         <Button variant="contained" 
            color="primary" 
            size="large" 
            fullWidth 
            disableElevation
            disabled={
               (data.status == "Cancelled" || data.status == "Delivered") 
               ? true 
               : false
            }
            onClick={() => {
               handleOpenDialog()
               setDeliveryToCancel(data.deliveryId)
            }}
         >
            <Typography variant="h6">Cancel Delivery</Typography>
         </Button>
      </div>
      
      <Dialog
         open={openDialog}
         onClose={handleCloseDialog}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">
            Cancel delivery
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">
               Are you sure you want to cancel delivery?
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
               No
            </Button>
            <Button onClick={handleCancelDelivery} color="primary" autoFocus>
               Yes
            </Button>
         </DialogActions>
      </Dialog>
   </>
}