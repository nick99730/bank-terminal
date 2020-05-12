import React, {Component} from 'react'
import styles from './Exchange.module.css'
import ConverterCurrency from "./ConverterCurrency/ConverterCurrency";
import CurrencyRate from "./CurrencyRate/CurrencyRate";

class Exchange extends Component {
    render() {
        return (
            <div className={styles.exchange_page}>
                <CurrencyRate/>
                <ConverterCurrency/>
            </div>
        )
    }
}

export default Exchange;