import { useState } from "react"
import Navigation from "../../../components/Nav"
import ShippingDetails from "../../../components/ShippingDetails"
import Transactions from "../../../components/Transactions"
import styles from "../../../css/dashboard.module.css"
import getDeliveries from "../../../services/getDeliveries"

export default function Dashboard(props) {

   const { deliveries } = props
   const [deliveryData, setDeliveryData] = useState(deliveries)
   
   return <>
      <div className={styles.container}>
         <div className={styles.header}>
            <Navigation />
         </div>
         <div className={styles.transactions}>
            <Transactions deliveries={deliveryData} updateDeliveries={setDeliveryData} />
         </div>
         <div className={styles.shipment}>
            <ShippingDetails />
         </div>
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