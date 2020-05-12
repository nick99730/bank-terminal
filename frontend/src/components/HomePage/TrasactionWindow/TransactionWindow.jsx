import React from 'react'
import styles from './TransactionWindow.module.css'
import {faEuroSign} from '@fortawesome/free-solid-svg-icons'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {bindActionCreators} from "redux";
import {setTransWindowInvisible} from "../../../redux/actions/index";
import {connect} from "react-redux";

const close = <FontAwesomeIcon icon={faTimes}/>;
const euro = <FontAwesomeIcon icon={faEuroSign}/>;

const TransactionWindow = (props) => {
    const setCardNumber = (operation, username) => {
        if (operation.type === "transaction") return operation.cardNumber;
        if (operation.type === "transfer" && operation.to === username) return operation.to_card_number;
        return operation.from_card_number;
    };
    const setDetails = (operation, username) => {
        if (operation.type === "transfer") {
            if (operation.to === username) return "Transfer from " + operation.from_card_number;
            else return "Transfer to " + operation.to_card_number;
        } else return "Transaction to " + operation.details + " for " + operation.beneficiary;
    };
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const {idOperation, transfers, transactions, balance, onCloseClick, username} = props;
    const operation = transfers.concat(transactions).find(x => x.id === idOperation);
    const {amount} = operation;
    const date = new Date(operation.date);
    return (
        <div className={`mr-auto mt-3 mb-3 ${styles.tr_window}`}>
            <div className="pt-2 pl-2">
                <div className={`${styles.font_light} d-inline-block`}>
                    {date.getDate()}.{monthNames[date.getMonth()]}.{date.getFullYear()} at {date.getHours()}:{date.getMinutes()}
                </div>
                <div onClick={() => {
                    onCloseClick()
                }} className={`float-right d-inline-block pr-3 ${styles.font_light} ${styles.close_btn}`}>{close}
                </div>
            </div>
            <div className="font-weight-bold pl-3 pt-3">
                {setDetails(operation, username)}
            </div>
            <div className={`pr-2 pt-3 pb-2 mx-2 px-0 ${styles.border}`}>
                <div className={` font-weight-bold d-inline-block `}>
                    {amount}{euro}
                </div>
                <div className={`${styles.font_balance} d-inline-block float-right`}>
                    Remaining balance<br/>
                    {balance}{euro}
                </div>
            </div>
            <div className={`mx-2 mb-3 pt-2`}>
                <span className={`font-weight-bold`}>Payment details</span><br/>
                <span className={`${styles.font_light} pt-2`}>Bank card</span><br/>
                <span>{setCardNumber(operation, username)}</span>
            </div>
        </div>
    )
};
const putDispatchToProps = dispatch => bindActionCreators({
    onCloseClick: setTransWindowInvisible,
}, dispatch);
const putStateToProps = (state) => {
    return {
        balance: state.balance,
        idOperation: state.idOperation,
        transfers: state.transfers,
        transactions: state.transactions,
        username: state.username
    }
};
export default connect(putStateToProps, putDispatchToProps)(TransactionWindow);
