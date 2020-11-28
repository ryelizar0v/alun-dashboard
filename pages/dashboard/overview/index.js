import { useState } from "react"
import Navigation from "../../../components/dashboard/Nav"
import ShippingDetails from "../../../components/dashboard/ShippingDetails"
import Transactions from "../../../components/dashboard/Transactions"
import styles from "../../../css/dashboard/layout.module.css"
import getDeliveries from "../../../services/dashboard/getDeliveries"

import Drawer from "@material-ui/core/Drawer"
import Banner from "../../../components/dashboard/Banner"

export default function Dashboard(props) {

   const { deliveries } = props
   const [deliveryData, setDeliveryData] = useState(deliveries)

   const [showShipment, setShowShipment] = useState(false)
   const handleShowShipment = (selected) => {
      if (!selected) setShowShipment(true)
      else setShowShipment(false)
   }

   const handleCloseShipment = () => {
      setShowShipment(false)
   }

   const [shipmentDetails, setShipmentDetails] = useState({})

   return <>
      <div className={styles.container}>
         <div className={`${styles.main} ${showShipment ? styles.collapsed : styles.full}`}>
            <div className={styles.head}>
               <Navigation />
               <Banner />
            </div>
            <div className={styles.transactions}>
               <Transactions 
                  deliveries={deliveryData} 
                  updateDeliveries={setDeliveryData}
                  showDetails={handleShowShipment}
                  getDetails={setShipmentDetails}
               />
            </div>
         </div>
         <Drawer
            variant="persistent"
            anchor="right"
            open={showShipment}
            classes={{
               paper: styles.shipment
            }}
            onClose={handleCloseShipment}
         >
            <ShippingDetails data={shipmentDetails} />
         </Drawer>
      </div>
   </>
}

export const getServerSideProps = async () => {
   const data = await getDeliveries()
   return {
      props: {
         deliveries: data.deliveries
      }
   }
}