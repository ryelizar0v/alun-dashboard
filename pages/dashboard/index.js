import { Button } from "@material-ui/core"
import ShippingDetails from "../../src/components/ShippingDetails"
import Transactions from "../../src/components/Transactions"

export default function Dashboard() {
   return <>
      <div className="container">
         <div className="header">
            <Button className="header--nav-button" variant="contained" color="secondary" disableElevation>Overview</Button>
            <Button variant="text" color="primary">Add a parcel</Button>
            <Button variant="text" color="primary">History</Button>
         </div>
         <div className="transactions">
            <Transactions />
         </div>
         <div className="shipment">
            <ShippingDetails />
         </div>
      </div>
   </>
}