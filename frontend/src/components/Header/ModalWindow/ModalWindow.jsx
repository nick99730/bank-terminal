import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import style from './ModalWindow.module.css'
import cross from '../../../cross.svg'
import {faEye} from '@fortawesome/free-solid-svg-icons'
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "../../SignUpPage/SignUpPage.module.css";
import {connect} from "react-redux";
import {
    fetchBeneficiaries,
    fetchCards,
    fetchTransactions,
    fetchTransfers,
    getBalance,
    setVisibleOperations
} from "../../../redux/fetchUserInfo";
import {
    setVisibleItems,
    setUserCards,
    setUserTransactions,
    setUserTransfers,
    setBalance,
    setLoggedIn,
    setUsername, setBeneficiaries
} from "../../../redux/actions"
import {bindActionCreators} from "redux";

const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>;
const eye = <FontAwesomeIcon icon={faEye}/>;


class ModalWindow extends Component {
    state = {
        login: "",
        hasLoginError: false,
        password: "",
        hasPasswordError: false,
        passwordInputType: 'password',
        passwordLabel: eye,
        loginResponse: ""
    };
    handleEyeClick = () => {
        this.setState(({passwordInputType}) => ({
            passwordInputType: passwordInputType === 'text' ? 'password' : 'text'
        }));
        this.setState(({passwordLabel}) => ({
            passwordLabel: passwordLabel === eyeSlash ? eye : eyeSlash
        }));
    };
    onPasswordChange = (password) => {
        this.setState({hasPasswordError: !this.isPasswordValid(password)});
        this.setState({password})
    };
    isPasswordValid = (pass) => {
        return pass.length > 0;
    };
    onLoginChange = (login) => {
        this.setState({hasLoginError: !this.isLoginValid(login)});
        this.setState({login})
    };
    isLoginValid = (login) => {
        return login.length > 0;
    };
    onLoginClick = (event) => {
        event.preventDefault();
        this.setState({hasLoginError: !this.isLoginValid(this.state.login)});
        this.setState({hasPasswordError: !this.isPasswordValid(this.state.password)});
        if (!(this.state.hasPasswordError || this.state.hasLoginError)) {
            const data = {
                username: this.state.login,
                password: this.state.password
            };
            fetch('http://localhost:8080/login', {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Origin': 'Access-Control-Allow-Origin',
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then((json) => {
                if (json.status === 'error') {
                    this.setState({loginResponse: "Invalid username or password!"})
                } else if (json.status === 'ok') {
                    localStorage.setItem("token", JSON.stringify(json.token));
                    this.props.setUsername(json.username);
                    fetchCards(json.username).then(cards => {
                        this.props.setCards(cards);
                        console.log(cards);
                        getBalance().then(balance => {
                            this.props.setBalance(balance)
                        });
                    });
                    fetchTransfers(json.username, 0).then(transfers => {
                        this.props.setTransfers(transfers);
                        setVisibleOperations();
                    });
                    fetchTransactions(json.username, 0).then(transactions => {
                        this.props.setTransactions(transactions);
                        setVisibleOperations();
                    });
                    fetchBeneficiaries().then(ben => this.props.setBeneficiaries(ben));
                    this.props.setLoggedIn(true);
                    this.props.handleClose();
                }
            }).catch(
                function (e) {
                    console.log('error');
                    console.log(e);
                });
        }
    };

    render() {
        const {show, handleClose} = this.props;
        const {hasLoginError, hasPasswordError, passwordInputType, passwordLabel, login, password, loginResponse} = this.state;
        const FieldError = (Error) => (
            Error ? {
                border: '1px solid #dc3545',
                "&:hover": {
                    border: '1px solid #dc3545!important',
                },
                "&:focus": {
                    border: '1px solid #dc3545!important',
                },
                backgroundImage: `url(${cross})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center right calc(0.375em + 0.1875rem)',
                backgroundSize: 'calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)'
            } : {}
        );
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className={style.no_shadow} closeButton>
                    <Modal.Title className={style.text_center}>Log in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group mb-3">
                        <label htmlFor="login_input" className="font-weight-bold">Login</label>
                        <input type="text" style={FieldError(hasLoginError)} value={login} id="login_input"
                               className={`${style.no_border} ${"form-control shadow-none"}`}
                               placeholder="Username" onChange={(e) => {
                            this.onLoginChange(e.target.value)
                        }}/>
                        {hasLoginError ? <div className={`invalid-feedback ${styles.d_block}`}>
                            Username is required field.
                        </div> : null
                        }
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="pass_input" className="font-weight-bold">Password</label>
                        <div className="d-flex align-items-center">
                            <input type={passwordInputType} value={password} id="pass_input"
                                   style={FieldError(hasPasswordError)}
                                   placeholder="Password"
                                   className={`form-control ${style.no_border} ${"form-control shadow-none"}`}
                                   onChange={(e) => {
                                       this.onPasswordChange(e.target.value)
                                   }}/>
                            <div className={styles.eye} onClick={this.handleEyeClick}>{passwordLabel}</div>
                        </div>
                        {hasPasswordError ? <div className={`invalid-feedback ${styles.d_block}`}>
                            Password is required field.
                        </div> : null
                        }
                    </div>
                    <div className={`d-flex justify-content-center ${styles.error}`}>
                        {loginResponse}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={`shadow-none btn btn-warning `} onClick={this.onLoginClick}>
                        Log in
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const putDispatchToProps = dispatch => bindActionCreators({
    setBeneficiaries: setBeneficiaries,
    setVisibleItems: setVisibleItems,
    setLoggedIn: setLoggedIn,
    setUsername: setUsername,
    setBalance: setBalance,
    setCards: setUserCards,
    setTransfers: setUserTransfers,
    setTransactions: setUserTransactions
}, dispatch);
export default connect(null, putDispatchToProps)(ModalWindow);
