import React from "react";
import AddCardForm from "./AddCardForm";
import styles from './MyCards.module.css'
import {bindActionCreators} from "redux";
import {setUserCards, setBalance, setUserTransactions, setUserTransfers} from "../../redux/actions";
import {connect} from "react-redux";
import DeleteCardForm from "./DeleteCardForm";

const MyCardsPage = (props) => {
    return (
        <div className={`${styles.your_cards}`}>
            <div className={`d-flex justify-content-center`}>
                <div className={`${styles.form} mt-3 `}>
                    <h4 className={`d-flex font-weight-bold mt-3 justify-content-center`}>Add card</h4>
                    <AddCardForm loggedIn={props.loggedIn} username={props.username} setBalance={props.setBalance}
                                 setUserCards={props.setUserCards}/>
                </div>
            </div>
            <div className={`d-flex justify-content-center`}>
                <div className={`${styles.form} mt-4`}>
                    <h4 className={`d-flex font-weight-bold mt-3 justify-content-center`}>Delete card</h4>
                    <DeleteCardForm cards={props.cards} setTransfers={props.setTransfers}
                                    setTransactions={props.setTransactions} setBalance={props.setBalance}
                                    username={props.username} setUserCards={props.setUserCards}/>
                </div>
            </div>
        </div>
    )
};
const putDispatchToProps = dispatch => bindActionCreators({
    setUserCards: setUserCards,
    setBalance: setBalance,
    setTransactions: setUserTransactions,
    setTransfers: setUserTransfers
}, dispatch);
const putStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        username: state.username,
        cards: state.cards
    }
};
export default connect(putStateToProps, putDispatchToProps)(MyCardsPage);