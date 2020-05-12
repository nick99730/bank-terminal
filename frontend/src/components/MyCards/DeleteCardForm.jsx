import React, {Component} from "react";
import Select from 'react-select'
import styles from './MyCards.module.css'
import CurrencySelect from "../CurrencySelect";
import {fetchCards, fetchTransactions, fetchTransfers, getBalance} from "../../redux/fetchUserInfo";

class DeleteCardForm extends Component {
    state = {
        delCardNumber: '',
        successfullyDeleting: false
    };
    onChangeSelect = (e) => {
        this.setState({successfullyDeleting: false});
        this.setState({delCardNumber: e.value})
    };
    fetchDelete = () => {
        let authToken = JSON.parse(localStorage.getItem('token'));
        console.log(this.state.delCardNumber);
        fetch(`http://localhost:8080/cards/delete/${this.state.delCardNumber}`, {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Origin': 'Access-Control-Allow-Origin',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then((json) => {
            if (json.status === 'ok') {
                this.setState({successfullyDeleting: true});
                fetchCards(this.props.username).then(cards => {
                    this.props.setUserCards(cards);
                    getBalance().then(balance => {
                        this.props.setBalance(balance)
                    });
                });
                fetchTransactions(this.props.username, 0).then(transactions => {
                    this.props.setTransactions(transactions)
                });
                fetchTransfers(this.props.username, 0).then(transfers => {
                    this.props.setTransfers(transfers)
                })
            }
        }).catch(
            function (e) {
                console.log('error');
                console.log(e);
            });
    };
    onClickDelete = (e) => {
        e.preventDefault();
        if (this.state.delCardNumber === '') {
            this.setState({delCardNumber: this.props.cards[0].cardNumber}, this.fetchDelete)
        } else this.fetchDelete();
    };

    render() {
        const {style} = CurrencySelect;
        const options = this.props.cards.map(card => {
            return {label: card.cardNumber, value: card.cardNumber}
        });
        return (
            <div className="mb-3">
                {this.props.cards.length === 0 ?
                    <div className="d-flex mt-3 justify-content-center">
                        You have not added any cards.
                    </div> :
                    <form onSubmit={this.onClickDelete}>
                        <div className="d-flex mt-3 mb-4 justify-content-center">
                            <Select options={options} styles={style} onChange={this.onChangeSelect}
                                    className={` ${styles.select}`} defaultValue={options[0]}/>
                        </div>
                        <div className="d-flex mt-3 justify-content-center">
                            <button type="submit" className="btn btn-warning shadow-none">Delete card</button>
                        </div>
                        {this.state.successfullyDeleting ?
                            <div className={`${styles.success_message} mt-3 d-flex justify-content-center`}>
                                Your card has been deleted successfully!
                            </div> : null}
                    </form>
                }
            </div>
        );
    }
}

export default DeleteCardForm;