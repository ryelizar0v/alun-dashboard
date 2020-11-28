import Link from "next/link"
import { Button } from "@material-ui/core"
import nav from "../../css/dashboard/nav.module.css"

export default function Navigation() {
   return <>
      <div className={nav.buttonContainer}>
         <div className={nav.button}>
            <Link href="/dashboard/overview">
               <Button variant="contained" color="secondary" size="large" disableElevation>Overview</Button>
            </Link>
         </div>
         <div className={nav.button}>
            <Link href="/dashboard/add-a-new-parcel">
               <Button variant="text" color="inherit" size="large">Add a new parcel</Button>
            </Link>
         </div>
         <div className={nav.button}>
            <Button variant="text" color="inherit" size="large">History</Button>
         </div>
      </div>
   </>
}