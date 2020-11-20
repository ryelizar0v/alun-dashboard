import Navigation from "../../src/components/Nav"
import ShippingDetails from "../../src/components/ShippingDetails"
import Transactions from "../../src/components/Transactions"

import styles from "../../src/css/dashboard.module.css"

export default function Dashboard() {
   return <>
      <div className={styles.container}>
         <div className={styles.header}>
            <Navigation />
         </div>
         <div className={styles.transactions}>
            <Transactions />
         </div>
         <div className={styles.shipment}>
            <ShippingDetails />
         </div>
      </div>
   </>
}