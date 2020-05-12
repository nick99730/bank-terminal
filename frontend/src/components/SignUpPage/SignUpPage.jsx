import React, {Component} from 'react'
import styles from './SignUpPage.module.css'
import {Redirect} from 'react-router-dom'
import moment from "moment";
import Select from "react-select";

import check from '../../check.svg'
import cross from '../../cross.svg'
import {faEye} from '@fortawesome/free-solid-svg-icons'
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const eyeSlash = <FontAwesomeIcon icon={faEyeSlash}/>;
const eye = <FontAwesomeIcon icon={faEye}/>;

class SignUpPage extends Component {
    state = {
        firstName: "",
        surname: "",
        email: "",
        password: "",
        username: "",
        hasFirstNameError: false,
        hasSurnameError: false,
        goodEmail: false,
        goodPassword: false,
        hasEmailError: false,
        hasPasswordError: false,
        hasDayError: false,
        hasYearError: false,
        hasMonthError: false,
        hasUsernameError: false,
        signUpSuccessfully: false,
        emailErrorMessage: 'Please enter a correct email.',
        usernameErrorMessage: 'Username must be 2 to 16 characters long.',
        passwordInputType: 'password',
        passwordLabel: eye,
        def_year: new Date().getFullYear() - 18,
        def_month: 1,
        def_day: 1
    };
    years_range = (min_age = 18, max_age = 100) => {
        let endAt = new Date().getFullYear() - min_age;
        let startAt = new Date().getFullYear() - max_age;
        let size = endAt - startAt;
        let years_list = [...Array(size).keys()].map(i => i + startAt + 1);
        return years_list.map((i) => {
            return {label: i, value: i}
        });
    };
    months_range = () => {
        return [...Array(12).keys()].map((i) => {
            return {label: moment.months()[i], value: i + 1}
        });
    };
    months = this.months_range();
    years = this.years_range();
    days = [...Array(31).keys()].map((i) => {
        return {label: i + 1, value: i + 1}
    });
    handleEyeClick = () => {
        this.setState(({passwordInputType}) => ({
            passwordInputType: passwordInputType === 'text' ? 'password' : 'text'
        }));
        this.setState(({passwordLabel}) => ({
            passwordLabel: passwordLabel === eyeSlash ? eye : eyeSlash
        }));
    };
    isNameValid = (name) => {
        return !(/\d/.test(name)) && name.length !== 0
    };
    onChangeName = (name, key_error, key_field) => {
        this.setState({[key_error]: !this.isNameValid(name)});
        this.setState({[key_field]: name});
    };
    isEmailValid = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase())
    };
    onChangeEmail = (email) => {
        this.setState({emailErrorMessage: "Please enter a correct email."});
        this.setState({hasEmailError: !this.isEmailValid(email)});
        this.setState({email: email});
        this.setState({goodEmail: this.isEmailValid(email)});
    };
    isUsernameValid = (username) => {
        return (username.length < 17) && (username.length > 1)
    };
    onChangeUsername = (username) => {
        this.setState({usernameErrorMessage: 'Username must be 2 to 16 characters long!'});
        this.setState({hasUsernameError: !this.isUsernameValid(username)});
        this.setState({username: username});
    };
    isPasswordValid = (password) => {
        return password.length > 7
    };
    onChangePassword = (pass) => {
        this.setState({hasPasswordError: !this.isPasswordValid(pass)});
        this.setState({password: pass});
        this.setState({goodPassword: this.isPasswordValid(pass)})
    };
    onChangeYear = (def_year) => {
        this.setState({def_year}, () => this.checkDate('hasYearError',
            'hasMonthError', 'hasDayError'));
    };
    checkDate = (key_check, key_disable1, key_disable2) => {
        const {def_year, def_day, def_month} = this.state;
        let date = new Date();
        date.setFullYear(def_year, def_month, def_day);
        console.log(date);
        this.setState({
            [key_disable1]: ![key_disable1]
        });
        this.setState({
            [key_disable2]: ![key_disable2]
        });
        this.setState({
                [key_check]: !((date.getFullYear() === def_year) && (date.getMonth() === def_month)
                    && (date.getDate() === def_day))
            }
        )
    };
    onSubmitClick = (event) => {
        event.preventDefault();
        this.setState({hasFirstNameError: !this.isNameValid(this.state.firstName)});
        this.setState({hasSurnameError: !this.isNameValid(this.state.surname)});
        this.setState({hasUsernameError: !this.isUsernameValid(this.state.username)});
        this.setState({hasPasswordError: !this.isPasswordValid(this.state.password)});
        this.setState({hasEmailError: !this.isEmailValid(this.state.email)}, () => {
                if (!(this.state.hasFirstNameError
                    || this.state.hasSurnameError
                    || this.state.hasUsernameError
                    || this.state.hasPasswordError
                    || this.state.hasEmailError
                    || this.state.hasYearError
                    || this.state.hasMonthError
                    || this.state.hasDayError)) {
                    const data = {
                        firstName: this.state.firstName,
                        lastName: this.state.surname,
                        password: this.state.password,
                        email: this.state.email,
                        username: this.state.username,
                        dateOfBirth: this.state.def_year + "-" + this.state.def_month + "-" + this.state.def_day
                    };
                    fetch('http://localhost:8080/sign_up', {
                        mode: 'cors',
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Origin': 'Access-Control-Allow-Origin',
                            'Content-Type': 'application/json'
                        }
                    }).then(response => response.json()).then((json) => {
                        if (json.status === 'error') {
                            if (JSON.parse(json.email_error)) {
                                this.setState({hasEmailError: true});
                                this.setState({goodEmail: false}, () => {
                                    this.setState({emailErrorMessage: "Email is already taken!"})
                                });
                            }
                            if (JSON.parse(json.username_error)) {
                                this.setState({hasUsernameError: true}, () => {
                                    this.setState({usernameErrorMessage: "Username is already taken!"})
                                });
                            }
                        } else if (json.status === 'ok') {
                            this.setState({signUpSuccessfully: true})
                        }
                    }).catch(
                        function (e) {
                            console.log('error');
                            console.log(e);
                        });
                }
            }
        );
    };
    onChangeMonth = (def_month) => {
        this.setState({def_month}, () => this.checkDate('hasMonthError',
            'hasYearError', 'hasDayError'));
    };
    onChangeDay = (def_day) => {
        this.setState({def_day}, () => this.checkDate('hasDayError',
            'hasMonthError', 'hasYearError'));
    };

    render() {
        const {
            firstName, email, password, username, surname, hasDayError, hasMonthError, hasYearError, hasEmailError, hasPasswordError, hasUsernameError, goodEmail, goodPassword,
            hasFirstNameError, hasSurnameError, emailErrorMessage, usernameErrorMessage, passwordLabel, passwordInputType, def_day, def_month, def_year
        } = this.state;
        const no_shadow = (Error) => (
            Error ? {} : {
                boxShadow: "0 !important",
                borderColor: "#ced4da",
            });
        const no_shadow_hover = () => ({
            "&:hover": {
                borderColor: "#ced4da !important"
            },
            "&:focus": {
                borderColor: "#ced4da !important"
            }
        });
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
        const FieldErrorGood = (Error, Good) => ({
                border: Error ? '1px solid #dc3545' : Good ? '1px solid green' : {},
                "&:hover": {
                    border: Error ? '1px solid #dc3545!important' : Good ? '1px solid green' : {},
                },
                "&:focus": {
                    border: Error ? '1px solid #dc3545!important' : Good ? '1px solid green' : {},
                },
                backgroundImage: Error ? `url(${cross})` : Good ? `url(${check})` : {},
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center right calc(0.375em + 0.1875rem)',
                backgroundSize: 'calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)'
            }
        );
        const baseStyle = () => ({
            borderRadius: '2px',
            backgroundColor: '#f6f5f3',
        });
        const otherStyle = {
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
                borderRadius: 2,
                border: '1px solid #ced4da',
                marginTop: 5
            })
        };
        const selectStylesHasDayError = (Error) => (
            Error ? {
                border: '1px solid #dc3545',
                "&:hover": {
                    border: '1px solid #dc3545',
                },
                "&:focus": {
                    border: '1px solid #dc3545!important',
                },
                backgroundImage: `url(${cross})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center right calc(0.375em + 2.5rem)',
                backgroundSize: 'calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)'
            } : {}
        );
        if (this.state.signUpSuccessfully === true) {
            return <Redirect to='/thank_you'/>
        }
        return (<div className={`${styles.sign_up} mt-3 mx-auto`}>
                <h4 className="d-flex pt-3 justify-content-center">Sign Up</h4>
                <form className={`ml-4`} onSubmit={this.onSubmitClick}>
                    <div className="form-group">
                        <label htmlFor="InputFirstName" className="font-weight-bold">First Name</label>
                        <input type="text" value={firstName} style={FieldError(hasFirstNameError)} onChange={(e) => {
                            this.onChangeName(e.target.value,
                                'hasFirstNameError', 'firstName')
                        }} className={`form-control ${styles.no_shadow} ${styles.data_input}`}
                               id="InputFirstName" placeholder="First Name"/>
                        {hasFirstNameError ? <div className={`invalid-feedback ${styles.d_block}`}>
                            First Name must not contain numbers and must not be empty.
                        </div> : null
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputSurname" className="font-weight-bold">Surname</label>
                        <input type="text" style={FieldError(hasSurnameError)} onChange={(e) => {
                            this.onChangeName(e.target.value, 'hasSurnameError', 'surname')
                        }} className={`form-control ${styles.no_shadow} ${styles.data_input}`} id="InputSurname"
                               placeholder="Surname" value={surname}/>
                        {hasSurnameError ? <div className={`invalid-feedback ${styles.d_block}`}>
                            Surname must not contain numbers and must not be empty.
                        </div> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputUsername" className="font-weight-bold">Username</label>
                        <input type="text" style={FieldError(hasUsernameError)} onChange={(e) => {
                            this.onChangeUsername(e.target.value, 'hasUsernameError')
                        }} value={username} className={`form-control ${styles.no_shadow} ${styles.data_input}`}
                               id="InputUsername" placeholder="Username"/>
                        {hasUsernameError ? <div className={`invalid-feedback ${styles.d_block}`}>
                            {usernameErrorMessage}
                        </div> : null}
                    </div>
                    <div className="form-group">
                        <div className={`font-weight-bold`}>Date of Birth</div>
                        <div className="d-flex">
                            <div className="mr-4">
                                <label htmlFor="InputYear" className={`${styles.d_block}`}>Year</label>
                                <Select options={this.years} id="InputYear" styles={{
                                    control: base => ({
                                        ...base,
                                        ...baseStyle(),
                                        ...selectStylesHasDayError(hasYearError),
                                        ...no_shadow_hover(hasYearError),
                                        ...no_shadow(),
                                    }),
                                    ...otherStyle,
                                }} onChange={(e) => this.onChangeYear(e.value)}
                                        className={`${styles.date_input}`}
                                        defaultValue={{label: def_year, value: def_year}}/>
                                {hasYearError ? <div className={`invalid-feedback ${styles.d_block}`}>
                                    Please select a correct year.
                                </div> : null}
                            </div>
                            <div className="mr-4">
                                <label htmlFor="InputMonth" className={`${styles.d_block}`}>Month</label>
                                <Select options={this.months} styles={{
                                    control: base => ({
                                        ...base,
                                        ...baseStyle(),
                                        ...selectStylesHasDayError(hasMonthError),
                                        ...no_shadow_hover(hasMonthError),
                                        ...no_shadow(),
                                    }),
                                    ...otherStyle,
                                }} id="InputMonth" onChange={(e) => this.onChangeMonth(e.value - 1)}
                                        className={`${styles.date_input}`} defaultValue={{
                                    label: moment.months()[def_month - 1],
                                    value: def_month
                                }}/>
                                {hasMonthError ? <div className={`invalid-feedback ${styles.d_block}`}>
                                    Please select a correct month.
                                </div> : null}
                            </div>
                            <div className="mr-4" styles={{
                                control: base => ({...selectStylesHasDayError(hasDayError),}),
                            }}>
                                <label htmlFor="InputDay" className={`${styles.d_block}`}>Day</label>
                                <Select id="InputDay" options={this.days} styles={{
                                    control: base => ({
                                        ...base,
                                        ...baseStyle(),
                                        ...selectStylesHasDayError(hasDayError),
                                        ...no_shadow_hover(hasDayError),
                                        ...no_shadow(),
                                    }),
                                    ...otherStyle,
                                }}
                                        className={`${styles.date_input_day}`}
                                        onChange={(e) => this.onChangeDay(e.value)}
                                        defaultValue={{label: def_day, value: def_day}}/>
                                {hasDayError ? <div className={`invalid-feedback ${styles.d_block}`}>
                                    Please select a correct day.
                                </div> : null}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputEmail" className="font-weight-bold">Email address</label>
                        <input type="email" style={FieldErrorGood(hasEmailError, goodEmail)} onChange={(e) => {
                            this.onChangeEmail(e.target.value)
                        }} className={`form-control ${styles.no_shadow} ${styles.data_input}`} id="InputEmail"
                               aria-describedby="emailHelp"
                               placeholder="Enter email" value={email}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                            anyone
                            else.</small>
                        {goodEmail ? <div className={`valid-feedback ${styles.d_block}`}>
                            Looks good!
                        </div> : null}
                        {hasEmailError ? <div className={`invalid-feedback ${styles.d_block}`}>
                            {emailErrorMessage}
                        </div> : null}
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold" htmlFor="InputPassword">Create a password</label>
                        <div className="d-flex align-items-center">
                            <input type={passwordInputType} style={FieldErrorGood(hasPasswordError, goodPassword)}
                                   onChange={(e) => {
                                       this.onChangePassword(e.target.value)
                                   }} className={`form-control ${styles.data_input} ${styles.no_shadow}`}
                                   id="InputPassword" placeholder="Password" value={password}/>
                            <div className={styles.eye} onClick={this.handleEyeClick}>{passwordLabel}</div>
                        </div>
                        {hasPasswordError ? <div className={`invalid-feedback ${styles.d_block}`}>
                            Password must be at least 8 characters!
                        </div> : null}
                        {goodPassword ? <div className={`valid-feedback ${styles.d_block}`}>
                            Looks good!
                        </div> : null}
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className={` btn mb-3 shadow-none btn-warning no`}>Create
                            account
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUpPage;