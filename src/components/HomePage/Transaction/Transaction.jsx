import React from 'react';
import payment_img from '../../../payment.svg'
import transfer_dep_img from '../../../transfer_deposit.svg'
import transfer_pay_img from '../../../transfer_payment.svg'
import styles from './Transaction.module.css'
import { faEuroSign } from '@fortawesome/free-solid-svg-icons'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const euro = <FontAwesomeIcon icon={faEuroSign} />;
const dollar = <FontAwesomeIcon icon={faDollarSign}/>;

function img_transaction(type) {
    if(type === 'payment' || type === 'deposit') return <img src={payment_img} alt="Payment, Deposit" />;
    else if (type === 'transfer_deposit') return <img src={transfer_dep_img} alt="Transfer Deposit" />;
    else return <img src={transfer_pay_img} alt="Transfer Payment" />;
}

function view_amount(amount, type, currency) {
    let sign;
    let cur;
    if(type === 'deposit' || type === 'transfer_deposit') sign = '+';
    else sign = '-';
    if(currency === 'euro') cur = euro;
    else cur = dollar;
    return <span>{sign}{amount} {cur}</span>
}

function Transaction({type, date, description, currency, amount}) {
    const style = {
        color: type === 'deposit' || type === 'transfer_deposit' ? "green" : "red"
    };
    return(
      <div className={`d-flex mx-2 py-2 align-items-center ${styles.transaction}`}>
          <span className="mx-2"><span className={styles.transaction_day}>{date.day} {date.month}</span><br/>
              <span className={styles.transaction_time}>{date.time}</span>
          </span>
          <span className="mx-2">{img_transaction(type)}</span>
          <span className="mx-2">{description}</span>
          <div className="float-right ml-auto"><span className="" style={style}>{view_amount(amount, type, currency)}</span></div>
      </div>
    );
}
export default Transaction;