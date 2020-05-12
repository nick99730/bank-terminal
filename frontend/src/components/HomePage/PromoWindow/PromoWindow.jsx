import React from 'react';
import styles from './PromoWindow.module.css'

function PromoWindow() {
    return (
        <div className={`${styles.window} mr-auto mt-3`}>
            <div className={`${styles.promo_window}`}>
                <div className={`${styles.promo_window_img}`}>
                    <div className={`${styles.bgFill}`}>
                        <span className={styles.text}><span className={styles.company}>Aliexpress</span><br/><span
                            className={styles.promo}>Cashback up to 7%</span>
                            <br/><span className={styles.terms}>For purchases on Aliexpress</span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromoWindow;