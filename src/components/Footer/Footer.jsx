import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    return(
        <footer className="border-top d-flex align-items-center justify-content-center">
            <div className={styles.page_footer}>
                <h6>Design by Grigorev</h6>
            </div>
        </footer>
    );
}
export default Footer;