import Navigation from "../../../components/dashboard/Nav"
import ParcelForm from "../../../components/dashboard/ParcelForm"
import styles from "../../../css/dashboard/parcel.layout.module.css"

export default function AddParcel() {
   return (
      <div className={styles.main}>
         <div className={styles.nav}>
            <Navigation />
         </div>
         <div className={styles.formContainer}>
            <div className={styles.form}>
               <ParcelForm />
            </div>
         </div>
      </div>
   )
}