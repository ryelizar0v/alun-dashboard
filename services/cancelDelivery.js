import axios from "axios"
import { CONFIG } from "../config"

export default async function cancelDelivery(id) {
   try {
      let token = null
      const tokenRes = await axios.post("https://dev-api.alun.app/api/token", {
         username: CONFIG.username,
         password: CONFIG.password
      })

      if (tokenRes.data.success) {
         token = tokenRes.data.result         
         try {
            const response = await axios.put(`https://dev-api.alun.app/api/pool/delivery/${id}/cancel`, {
                  data: ""
               }, {
               headers: {
                  Authorization: `Bearer ${token}`
               }
            })
            if (response.data.success) {
               console.log(response.message)
               return response.data
            } else {
               console.error(response.message)
               return response.data
            }
         } catch (err) {
            console.error(err)
            return {
               error: err,
               from: "cancel"
            }
         }
      }
   } catch (err) {
      console.error(err)
      return err
   }
}