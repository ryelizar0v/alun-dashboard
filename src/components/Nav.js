import { Button } from "@material-ui/core"
import nav from "../css/nav.module.css"

export default function Navigation() {
   return <>
      <div className={nav.buttonContainer}>
         <div className={nav.button}>
            <Button variant="contained" color="secondary" size="large" disableElevation>Overview</Button>
         </div>
         <div className={nav.button}>
            <Button variant="text" color="inherit" size="large">Add a new parcel</Button>
         </div>
         <div className={nav.button}>
            <Button variant="text" color="inherit" size="large">History</Button>
         </div>
      </div>
   </>
}