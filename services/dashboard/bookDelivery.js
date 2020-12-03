import axios from "axios"
import { CONFIG } from "../../config"

export default async function bookDelivery(data) {
   try {
      let token = null
      const tokenRes = await axios.post("https://dev-api.alun.app/api/token", {
         username: CONFIG.username,
         password: CONFIG.password
      })

      if (tokenRes.data.success) {
         token = tokenRes.data.result         
         try {
            const response = await axios.post("https://dev-api.alun.app/api/pool/delivery", {
                  senderName: "SM Hypermarket",
                  senderAddress: "SM City Naga",
                  receiverName: `${data.firstName} ${data.middleName} ${data.lastName}`,
                  receiverAddress: `${data.addrNumber} ${data.addrStreet}, ${data.addrBuilding} ${data.addrBrgy}, ${data.addrMunicipality}`,
                  nearestLandmark: data.addrLandmark,
                  receiverNumber: data.contactNumber,
                  deliveryDate: new Date()
               }, {
               headers: {
                  Authorization: `Bearer ${token}`
               }
            })
            if (response.data.success) {
               console.log(response)
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