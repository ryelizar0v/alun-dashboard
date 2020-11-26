import axios from "axios"
import { CONFIG } from "../config"

export default async function getDeliveries() {
   try {
      let token = null
      const tokenRes = await axios.post("https://dev-api.alun.app/api/token", {
         username: CONFIG.username,
         password: CONFIG.password
      })

      if (tokenRes.data.success) {
         token = tokenRes.data.result
         
         try {
            const response = await axios.get("https://dev-api.alun.app/api/pool/delivery", {
               headers: {
               Authorization: `Bearer ${token}`
               }
            })
            if (response.data.success) {
               return {
                  deliveries: response.data.result
               }
            } else {
               return {
                  deliveries: []
               }
            }
         } catch (err) {
            console.error(err)
            return {
               deliveries: []
            }
         }
      }
   } catch (err) {
      console.error(err)
      return {
         deliveries: []
      }
   }
}