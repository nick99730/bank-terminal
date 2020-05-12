import React, {Component} from 'react';
import styles from './Header.module.css';
import UnregUser from "./UnregUser/UnregisteredUser";
import RegUser from "./RegUser/RegisteredUser";
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEuroSign} from '@fortawesome/free-solid-svg-icons'

const euro = <FontAwesomeIcon icon={faEuroSign} color="#6c757d"/>;

const Header = (props) => {
    const {loggedIn, username, balance} = props;
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <header>
            <div className={styles.full_header}>
                <div className="container">
                    <div className="row justify-content-lg-around pt-4">
                        <div id={styles.logo}>
                            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                            <h4><span className={`${styles.logo_initials}`}>NG </span><span
                                className={`${styles.logo_money} ${"font-weight-bold"}`}>Money</span></h4>
                        </div>
                        <div className={styles.money_amt}>
                            {/*<h4 className={`${"px-4 pt-2"} ${styles.money_btn}`}>Add</h4>*/}
                            <h4><span className="font-weight-bold">{Math.floor(balance)}</span>
                                <span
                                    className={styles.fract_prt}>.{(balance % 1).toFixed(2).substring(2)} {euro}</span>
                            </h4>
                            {/*<h4 className={`${"px-4 pt-2"} ${styles.money_btn}`}>Withdraw cash</h4>*/}
                        </div>
                        {loggedIn ? <RegUser user_name={username}/> :
                            <UnregUser handleShow={handleShow} handleClose={handleClose} show={show}/>}
                    </div>
                    <div className="row pt-3 pb-2">
                        <nav className={styles.top_menu}>
                            <ul className={`${"list-inline"} ${styles.list_menu}`}>
                                <li id="home-btn" className="list-inline-item mx-4"><NavLink exact to='/'
                                                                                             activeClassName={styles.active_link}>Home</NavLink>
                                </li>
                                <li id="payment-btn" className="list-inline-item mx-4"><NavLink to='/finance'
                                                                                                activeClassName={styles.active_link}>Finance</NavLink>
                                </li>
                                <li id="your-cards=btn" className="list-inline-item mx-4"><NavLink to='/my_cards'
                                                                                                   activeClassName={styles.active_link}>My
                                    cards</NavLink></li>
                                <li id="exchange-btn" className="list-inline-item mx-4"><NavLink to='/exchange'
                                                                                                 activeClassName={styles.active_link}>Exchange</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};
const putStateToHeaderProps = (store) => {
    return {
        loggedIn: store.loggedIn,
        username: store.username,
        balance: store.balance
    }
};
export default connect(putStateToHeaderProps)(Header);