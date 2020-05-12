import React from 'react';
import payment_img from '../../../payment.svg'
import transfer_dep_img from '../../../transfer_deposit.svg'
import transfer_pay_img from '../../../transfer_payment.svg'
import styles from './Transaction.module.css'
import {faEuroSign} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {bindActionCreators} from "redux";
import {setTransWindowVisible} from "../../../redux/actions/index";
import {connect} from "react-redux";

const euro = <FontAwesomeIcon icon={faEuroSign}/>;

function img_transaction(operation, username) {
    if (operation.type === 'transaction') return <img src={payment_img} alt="Payment, Deposit"/>;
    else if (operation.type === 'transfer' && operation.to === username) return <img src={transfer_dep_img}
                                                                                     alt="Transfer Deposit"/>;
    else return <img src={transfer_pay_img} alt="Transfer Payment"/>;
}

function view_amount(amount, to, username) {
    let sign;
    if (to === username) sign = '+';
    else sign = '-';
    return <span>{sign}{amount} {euro}</span>
}

function Transaction(props) {
    const {operation, onTransactionClick, username} = props;
    const {amount, to, details, type, id} = operation;
    const date = new Date(operation.date);
    const style = {
        color: type === "transaction" ? "#212529" : operation.to === username ? "#09682b" : "#212529"
    };
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return (
        <div className={`d-flex mx-2 py-2 align-items-center ${styles.transaction}`}
             onClick={() => onTransactionClick(id)}>
          <span className="mx-2"><span
              className={styles.transaction_day}>{date.getDate()} {monthNames[date.getMonth()]}</span><br/>
              <span className={styles.transaction_time}>{date.getHours()}:</span>
              <span className={styles.transaction_time}>{date.getMinutes()}</span>
          </span>
            <span className="mx-2">{img_transaction(operation, username)}</span>
            <span className="mx-2">{details}</span>
            <div className="float-right ml-auto"><span className=""
                                                       style={style}>{view_amount(amount, to, username)}</span></div>
        </div>
    );
}

const putDispatchToProps = dispatch => bindActionCreators({
    onTransactionClick: setTransWindowVisible,
}, dispatch);
const putStateToProps = (state) => {
    return {
        username: state.username
    }
};
export default connect(putStateToProps, putDispatchToProps)(Transaction);