import Link from "next/link"
import { withRouter } from "next/router"
import { Button } from "@material-ui/core"
import nav from "../../css/dashboard/nav.module.css"

const selectedProps = {
   variant: "contained",
   color: "secondary",
   disableElevation: true
}

const notSelectedProps = {
   variant: "text",
   color: "inherit"
}

function Navigation({ router }) {

   const overview = router.pathname == "/dashboard/overview" ? true : false
   const parcel = router.pathname == "/dashboard/add-a-new-parcel" ? true : false

   console.log(router.pathname)

   return <>
      <div className={nav.buttonContainer}>
         <div className={nav.button}>
            <Link href={{ pathname: "/dashboard/overview" }}>
               {overview 
                  ? <Button {...selectedProps} size="large">Overview</Button>
                  : <Button {...notSelectedProps} size="large">Overview</Button>
               }
            </Link>
         </div>
         <div className={nav.button}>
            <Link href={{ pathname: "/dashboard/add-a-new-parcel" }}>
               {parcel 
                  ? <Button {...selectedProps} size="large">Add a new parcel</Button>
                  : <Button {...notSelectedProps} size="large">Add a new parcel</Button>
               }
            </Link>
         </div>
         <div className={nav.button}>
            <Button variant="text" color="inherit" size="large">History</Button>
         </div>
      </div>
   </>
}

const NavButton = ({ label, selected }) => {
   if (selected) return <Button {...selectedProps} size="large">{label}</Button>
   else return <Button {...selectedProps} size="large">{label}</Button>
}

export default withRouter(Navigation)