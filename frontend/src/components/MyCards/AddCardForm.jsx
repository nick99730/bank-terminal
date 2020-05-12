import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styles from './MyCards.module.css'
import {fetchCards, getBalance} from "../../redux/fetchUserInfo";

class AddCardForm extends React.Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
        hasCvcError: false,
        hasExpiryError: false,
        hasNameError: false,
        hasNumberError: false,
        successfullyAddition: false,
        errAddition: false
    };
    handleInputFocus = (e) => {
        this.setState({focus: e.target.name});
    };
    isNumber = (number) => {
        let numbers = /^[0-9]+$/;
        return (number.match(numbers) || number.length === 0)
    };
    onChangeNumber = (e) => {
        let number = e.target.value;
        if (this.isNumber(number) && number.length < 17) {
            this.setState({hasNumberError: false});
            this.setState({number});
            this.setState({successfullyAddition: false});
            this.setState({errAddition: false});
        }
    };
    isNameValid = (name) => {
        return (/^[A-Z/\s]+$/.test(name) || name.length === 0) && name.length < 25;
    };
    onChangeName = (e) => {
        let name = e.target.value.toUpperCase();
        if (this.isNameValid(name)) {
            this.setState({hasNameError: false});
            this.setState({name});
            this.setState({successfullyAddition: false})
        }
    };
    onChangeExpiry = (e) => {
        let expiry = e.target.value;
        if (this.isNumber(expiry) && expiry.length < 5) {
            this.setState({hasExpiryError: false});
            this.setState({expiry});
            this.setState({successfullyAddition: false});
        }
    };
    onChangeCvc = (e) => {
        let cvc = e.target.value;
        if (this.isNumber(cvc) && cvc.length < 4) {
            this.setState({cvc});
            this.setState({hasCvcError: false});
            this.setState({successfullyAddition: false});
        }
    };
    onClickAdd = (e) => {
        e.preventDefault();
        this.setState({hasCvcError: this.state.cvc.length !== 3});
        this.setState({hasNameError: this.state.name.length === 0});
        this.setState({hasNumberError: this.state.number.length !== 16});
        this.setState({hasExpiryError: this.state.expiry.length !== 4 || this.state.expiry >= 1300});
        if (!(this.state.hasCvcError ||
            this.state.hasExpiryError ||
            this.state.hasNameError ||
            this.state.hasNumberError)) {
            const data = {
                cardholderName: this.state.name,
                cvc: this.state.cvc,
                username: this.props.username,
                expiry: this.state.expiry,
                cardNumber: this.state.number
            };
            let authToken = JSON.parse(localStorage.getItem('token'));
            fetch('http://localhost:8080/cards/add', {
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
                    this.setState({errAddition: true})

                } else if (json.status === 'ok') {
                    this.setState({successfullyAddition: true});
                    fetchCards(this.props.username).then(cards => {
                        this.props.setUserCards(cards);
                        getBalance().then(balance => {
                            this.props.setBalance(balance)
                        });
                    });
                }
            }).catch(
                function (e) {
                    console.log('error');
                    console.log(e);
                });
        }
    };

    render() {
        const Error = (hasError) => <div>{hasError ? <div className={`invalid-feedback ${styles.d_block}`}>
            This field is incorrect.
        </div> : null}
        </div>;
        return (<div>
                {this.props.loggedIn ?
                    <div id="PaymentForm">
                        <Cards
                            cvc={this.state.cvc}
                            expiry={this.state.expiry}
                            focused={this.state.focus}
                            name={this.state.name}
                            number={this.state.number}
                        />
                        <form className="mx-5 mt-3 mb-4" onSubmit={this.onClickAdd}>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="number"
                                    placeholder="Card Number"
                                    value={this.state.number}
                                    className={`shadow-none form-control ${styles.data_input}`}
                                    onChange={this.onChangeNumber}
                                    onFocus={this.handleInputFocus}
                                />
                                {Error(this.state.hasNumberError)}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your First Name and Surname"
                                    value={this.state.name}
                                    className={`shadow-none form-control my-3 ${styles.data_input}`}
                                    onChange={this.onChangeName}
                                    onFocus={this.handleInputFocus}
                                />
                                {Error(this.state.hasNameError)}
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="form-group p-0 col-8">
                                        <input
                                            type="tel"
                                            name="expiry"
                                            placeholder="Valid Thru"
                                            value={this.state.expiry}
                                            className={`shadow-none form-control ${styles.data_input}`}
                                            onChange={this.onChangeExpiry}
                                            onFocus={this.handleInputFocus}
                                        />
                                        {Error(this.state.hasExpiryError)}
                                    </div>
                                    <div className="form-group px-0 col-3 mr-0 ml-auto">
                                        <input
                                            type="tel"
                                            name="cvc"
                                            placeholder="CVC"
                                            value={this.state.cvc}
                                            className={`shadow-none form-control  ${styles.data_input}`}
                                            onChange={this.onChangeCvc}
                                            onFocus={this.handleInputFocus}
                                        />
                                        {Error(this.state.hasCvcError)}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mt-3 justify-content-center">
                                <button type="submit" className="btn btn-warning shadow-none">Add card</button>
                            </div>
                            {this.state.errAddition ?
                                <div className={`d-flex justify-content-center ${styles.error_message}`}>
                                    Bank card with this number already exists!
                                </div> : null}
                            {this.state.successfullyAddition ?
                                <div className={`d-flex justify-content-center ${styles.success_message}`}>
                                    Bank card successfully added!
                                </div> : null}
                        </form>
                    </div>
                    :
                    <div className={`${styles.form} mt-3 d-flex mb-3 justify-content-center`}>To add a card you need to
                        log in!</div>}
            </div>
        );
    }
}

export default AddCardForm;