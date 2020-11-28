import React from 'react'
import Carousel from 'react-material-ui-carousel'

import styles from "../../css/dashboard/banner.module.css"
 
export default function Banner() {
    return (
      <Carousel animation="slide" className={styles.banner} indicators={false} interval={10000}>       
         <div className={styles.item}>
            <img src="/alun-2.jpg" className={styles.image} />
         </div>
         <div className={styles.item}>
            <img src="/alun-1.png" className={styles.image} />
         </div>
         <div className={styles.item}>
            <img src="/alun-3.jpg" className={styles.image} />
         </div>
      </Carousel>
    )
}