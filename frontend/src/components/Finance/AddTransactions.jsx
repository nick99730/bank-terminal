import React, {Component} from "react";
import styles from "./Finance.module.css";
import Select from "react-select";
import {fetchCards, fetchTransactions, getBalance, setVisibleOperations} from "../../redux/fetchUserInfo";
import {setKindOfBeneficiary} from "../../redux/actions";

class AddTransaction extends Component {
    state = {
        hasAmountError: false,
        details: '',
        amount: '',
        from_card: '',
        makeSuccessfully: false,
        hasDetailsError: false,
        insufficientError: false,
    };
    isNumber = (number) => {
        let numbers = /^(\d+\.?\d{0,2}|\.\d{1,2})$/;
        return (number.match(numbers) || number.length === 0)
    };
    onChangeAmount = (e) => {
        let number = e.target.value;
        if (this.isNumber(number)) {
            this.setState({hasAmountError: false});
            this.setState({insufficientError: false});
            this.setState({amount: number})
        }
    };
    onChangeDetails = (e) => {
        let details = e.target.value;
        this.setState({details})
    };
    onChangeSelect = (e) => {
        this.setState({insufficientError: false});
        this.setState({notExistError: false});
        this.setState({from_card: e.value})
    };
    fetchTransaction = () => {
        this.setState({hasDetailsError: this.state.details.length === 0});
        this.setState({hasAmountError: this.state.amount.length === 0 || this.state.amount === '0'}, () => {
            if (!(this.state.hasAmountError || this.state.hasDetailsError)) {
                const data = {
                    cardNumber: this.state.from_card,
                    amount: this.state.amount,
                    beneficiaryId: this.props.to,
                    details: this.state.details
                };
                let authToken = JSON.parse(localStorage.getItem('token'));
                fetch('http://localhost:8080/transactions/add', {
                    mode: 'cors',
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Authorization': 'Bearer ' + authToken,
                        'Origin': 'Access-Control-Allow-Origin',
                        'Content-Type': 'application/json'
                    }
                }).then(response => response.json()).then((json) => {
                    if (json.status === 'error') {
                        this.setState({insufficientError: true})
                    } else if (json.status === 'ok') {
                        this.setState({makeSuccessfully: true});
                        fetchCards(this.props.username).then(cards => {
                            this.props.setUserCards(cards);
                            getBalance().then(balance => {
                                this.props.setBalance(balance)
                            });
                        });
                        fetchTransactions(this.props.username, 0).then(transactions => {
                            this.props.setTransactions(transactions);
                            setVisibleOperations();
                        });
                        setTimeout(() => {
                            this.props.setKindOfBeneficiary('');
                            this.props.setIdBeneficiary(0)
                        }, 2000);
                    }
                }).catch(
                    function (e) {
                        console.log('error');
                        console.log(e);
                    });
            }
        });
    };
    onClickMake = (e) => {
        e.preventDefault();
        if (this.state.from_card === '') {
            this.setState({from_card: this.props.cards[0].cardNumber}, this.fetchTransaction)
        } else this.fetchTransaction();
    };

    render() {
        const Error = (hasError) => <div>{hasError ? <div className={`invalid-feedback ${styles.d_block}`}>
            This field is incorrect.
        </div> : null}
        </div>;
        const options = this.props.cards.map(card => {
            return {label: card.cardNumber, value: card.cardNumber}
        });
        const style = {
            control: (base, state) => ({
                ...base,
                boxShadow: "0 !important",
                borderColor: "#ced4da",
                backgroundColor: "#f6f5f3",
                color: '#6c757d',
                "&:hover": {
                    borderColor: "#ced4da !important"
                },
                "&:focus": {
                    borderColor: "#ced4da !important"
                },
                height: 30, fontSize: 15, width: '15rem',
            }),
            option: (provided, state) => ({
                ...provided,
                fontSize: 15,
                paddingBottom: 2,
                paddingTop: 2,
                "&:hover": {
                    backgroundColor: "#ffea9e"
                },
                color: "#6c757d",
                backgroundColor: state.isSelected ? "white" : "white"

            }),
            menu: (state) => ({
                overflow: 'visible',
                position: "absolute",
                zIndex: '999',
                width: "15rem",
                borderRadius: 2,
                border: '1px solid #ced4da',
                marginTop: 5
            })
        };
        return (
            <div className="mt-3 mb-4">
                <form onSubmit={this.onClickMake}>
                    <Select options={options} styles={style} onChange={this.onChangeSelect} className={`mx-auto my-3`}
                            defaultValue={options[0]}/>
                    <div className="form-group">
                        <input type="text" onChange={this.onChangeAmount} value={this.state.amount}
                               className={` d-flex form-control mx-auto ${styles.form_control} my-3 shadow-none`}
                               placeholder="Amount" aria-label="Amount"/>
                        {Error(this.state.hasAmountError)}
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={this.onChangeDetails} value={this.state.details}
                               className={` d-flex form-control mx-auto ${styles.form_control} my-3 shadow-none`}
                               placeholder="Details" aria-label="Details"/>
                        {Error(this.state.hasDetailError)}
                    </div>
                    <button type="submit" className={`mx-auto mt-4 shadow-none btn btn-warning d-block`}>Make
                        transaction
                    </button>
                    {this.state.insufficientError ?
                        <div className={`my-3 ${styles.error_msg} d-flex justify-content-center`}>Insufficient funds on
                            credit card!</div> : null}
                    {this.state.makeSuccessfully ?
                        <div className={`my-3 ${styles.successfully_msg} d-flex justify-content-center`}>Transaction was
                            successful!</div> : null}
                </form>
            </div>
        )
    }
}

export default AddTransaction;