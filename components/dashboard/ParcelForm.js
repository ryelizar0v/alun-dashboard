import { Button, MenuItem, TextField, Typography } from "@material-ui/core"
import { ErrorMessage, Field, Form, Formik } from "formik"
import styles from "../../css/dashboard/parcelform.module.css"
import { number, object, string } from "yup"

import bookDelivery from "../../services/dashboard/bookDelivery"

export default function ParcelForm() {

   const ParcelDetails = {
      firstName: "",
      middleName: "",
      lastName: "",
      contactNumber: "",
      altContactNumber1: "",
      altContactNumber2: "",
      addrNumber: "",
      addrStreet: "",
      addrBuilding: "",
      addrLandmark: "",
      addrBrgy: "Santo Domingo",
      addrMunicipality: "Naga City"
   }

   const municipalities = [
      { id: 1, municipality: "Naga City" },
      { id: 2, municipality: "Iriga City" }
   ]

   const barangays = [
      { id: 1, barangay: "Santo Domingo" },
      { id: 2, barangay: "Penafrancia"},
      { id: 3, barangay: "Concepcion Grande" } 
   ]

   return <>
      <Typography variant="h4" gutterBottom>
         <strong>Enter recipient details</strong>
      </Typography>
      <Formik
         initialValues={ParcelDetails}
         validationSchema={
            object({
               firstName: string().required("First name is required"),
               lastName: string().required("Last name is required"),
               contactNumber: number().required("Contact number is required").positive("Invalid contact number"),
               addrNumber: string().required("Please indicate the address number"),
               addrStreet: string().required("Please indicate the street address"),
               addrMunicipality: string().required("Please choose a city or municipality"),
               addrBrgy: string().required("Please choose a barangay")
            })
         }
         onSubmit={async (values, formikHelpers) => {
            await bookDelivery(values)
            formikHelpers.resetForm()
         }}
      >
         {({ values, errors, touched, isSubmitting }) => (
            <Form>
               <div className={styles.group}>
               <Typography variant="h6" gutterBottom>Recipient details</Typography>
                  <div className={styles.row}>
                     <div className={styles.field}>
                        <Field
                           name="firstName"
                           as={TextField}
                           label="First Name"
                           fullWidth
                           error={errors.firstName && touched.firstName ? true : false}
                           helperText={<ErrorMessage name="firstName" />}
                        />
                        
                     </div>
                     <div className={styles.field}>
                        <Field
                           name="middleName"
                           as={TextField}
                           label="Middle Name"
                           fullWidth
                        />
                     </div>
                     <div className={styles.field}>
                        <Field
                           name="lastName"
                           as={TextField}
                           label="Last Name"
                           fullWidth
                           error={errors.lastName && touched.lastName ? true : false}
                           helperText={<ErrorMessage name="lastName" />}
                        />
                     </div>
                  </div>

                  <div className={styles.row}>
                     <div className={styles.field}>
                        <Field
                           name="contactNumber"
                           as={TextField}
                           label="Contact Number"
                           fullWidth
                           type="number"
                           error={errors.contactNumber && touched.contactNumber ? true : false}
                           helperText={<ErrorMessage name="contactNumber" />}
                        />
                     </div>
                     <div className={styles.field}>
                        <Field
                           name="altContactNumber1"
                           as={TextField}
                           label="Alternative Contact Number"
                           fullWidth
                        />
                     </div>
                     <div className={styles.field}>
                        <Field
                           name="altContactNumber2"
                           as={TextField}
                           label="Alternative Contact Number"
                           fullWidth
                        />
                     </div>
                  </div>
               </div>
               
               <div className={styles.group}>
                  <Typography variant="h6" gutterBottom>Address</Typography>
                  <div className={styles.row}>
                     <div className={styles.field}>
                        <Field
                           name="addrNumber"
                           as={TextField}
                           label="Unit/House/Lot/Block/Zone No."
                           fullWidth
                           error={errors.addrNumber && touched.addrNumber ? true : false}
                           helperText={<ErrorMessage name="addrNumber" />}
                        />
                     </div>
                     <div className={styles.field}>
                        <Field
                           name="addrStreet"
                           as={TextField}
                           label="Street"
                           fullWidth
                           error={errors.addrStreet && touched.addrStreet ? true : false}
                           helperText={<ErrorMessage name="addrStreet" />}
                        />
                     </div>
                     <div className={styles.field}>
                        <Field
                           name="addrBuilding"
                           as={TextField}
                           label="Building"
                           fullWidth
                        />
                     </div>
                  </div>

                  <div className={styles.row}>
                     <div className={styles.field}>
                        <Field
                           name="addrLandmark"
                           as={TextField}
                           label="Landmark"
                           fullWidth
                        />
                     </div>
                     <div className={styles.field}>
                        <Field
                           name="addrMunicipality"
                           as={TextField}
                           label="Municipality/City"
                           select
                           fullWidth
                           error={errors.addrMunicipality && touched.addrMunicipality ? true : false}
                           helperText={<ErrorMessage name="addrMunicipality" />}
                        >
                           {municipalities.map((mun) => {
                              return <MenuItem key={mun.id} value={mun.municipality}>
                                 {mun.municipality}
                              </MenuItem>
                           })}
                        </Field>
                     </div>
                     <div className={styles.field}>
                        <Field
                           name="addrBrgy"
                           as={TextField}
                           label="Barangay"
                           select
                           fullWidth
                           error={errors.addrBrgy && touched.addrBrgy ? true : false}
                           helperText={<ErrorMessage name="addrBrgy" />}
                        >
                           {barangays.map((brgy) => {
                              return <MenuItem key={brgy.id} value={brgy.barangay}>
                                 {brgy.barangay}
                              </MenuItem>
                           })}
                        </Field>
                     </div>
                  </div>
               </div>

               <div className={styles.row}>
                  <div className={styles.button}>
                     <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        disableElevation
                        fullWidth
                        disabled={isSubmitting}
                     >
                        <Typography variant="h6">Continue</Typography>
                     </Button>
                  </div>
               </div>
            </Form>
         )}
      </Formik>
   </>
}