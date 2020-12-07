import { 
   Button, 
   Step, 
   StepContent, 
   StepLabel, 
   Stepper, 
   Typography,
   Dialog, 
   DialogTitle, 
   DialogContent, 
   DialogContentText, 
   DialogActions, 
   Divider 
} from "@material-ui/core"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import styles from "../../css/dashboard/shipment.module.css"
import { useState } from "react"
import cancelDelivery from "../../services/dashboard/cancelDelivery"
import getDeliveries from "../../services/dashboard/getDeliveries"
import dayjs from "dayjs"

const useStyles = makeStyles(() => ({
   root: {
      background: "#fff",
      border: "1px solid #000",
      color: "#000",
      transition: "all .5s",
      '&$disabled': {
         border: "none"
      },
      '&:hover': {
         background: "#ddd"
      }
   },
   disabled: {}
}))

export default function ShippingDetails(props) {

   const cancelButton = useStyles()

   const { data, updateDeliveries, show } = props
   const { delivery_status_histories } = data
   const hasDeliveryHistory = delivery_status_histories?.length

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
         {hasDeliveryHistory
            ? <Stepper activeStep={delivery_status_histories.length-1} orientation="vertical">
                  {delivery_status_histories?.map((info, i) => {
                     return <Step key={i+1} expanded completed={i < 1 ? true : false }>
                        <StepLabel>
                           <Typography variant="h6"><strong>{info.status}</strong></Typography>
                        </StepLabel>
                        <StepContent>
                           <Typography variant="subtitle1">{dayjs(info.createdAt).format("MMMM D, YYYY h:mm A")}</Typography>
                        </StepContent>
                     </Step>
                  }).reverse()}
               </Stepper>
            : <Typography variant="h6" align="center"><strong>Delivery status history unavailable</strong></Typography>
         }
         
      </div>

      <div className={styles.actionButtons}>
         <Button variant="contained" 
            color="primary" 
            size="large" 
            fullWidth 
            disableElevation
            style={{ marginBottom: "0.5rem" }}
            disabled={
               (hasDeliveryHistory 
                  ? delivery_status_histories[0].status == "Cancelled" ? true : false
                  : true
               )
            }
         >
            <Typography variant="h6">Print Waybill</Typography>
         </Button>
         <Button variant="contained" 
            color="primary" 
            size="large"
            classes={{
               root: cancelButton.root,
               disabled: cancelButton.disabled
            }}
            fullWidth 
            disableElevation
            disabled={
               (hasDeliveryHistory 
                  ? delivery_status_histories[0].status == "Cancelled" || delivery_status_histories[0].status == "Delivered" ? true : false
                  : true
               )
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