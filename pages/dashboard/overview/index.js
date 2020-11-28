import { useState } from "react"
import Navigation from "../../../components/dashboard/Nav"
import ShippingDetails from "../../../components/dashboard/ShippingDetails"
import Transactions from "../../../components/dashboard/Transactions"
import styles from "../../../css/dashboard/layout.module.css"
import getDeliveries from "../../../services/dashboard/getDeliveries"

import Drawer from "@material-ui/core/Drawer"
import Banner from "../../../components/dashboard/Banner"
import { useMediaQuery } from "@material-ui/core"

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

   const desktop = useMediaQuery("(min-width: 80.01em)")

   return <>
      <div className={`${styles.main} ${showShipment ? styles.collapsed : styles.full}`}>
         <Navigation />
         <Banner />
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
         variant={desktop ? "persistent" : "temporary"}
         anchor="right"
         open={showShipment}
         classes={{
            paper: styles.shipment
         }}
         onClose={handleCloseShipment}
      >
         <ShippingDetails data={shipmentDetails} />
      </Drawer>
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