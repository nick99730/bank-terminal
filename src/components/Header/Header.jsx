import React from 'react';
import styles from './Header.module.css';
import UnregUser from "./UnregUser/UnregisteredUser";
import RegUser from "./RegUser/RegisteredUser";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEuroSign } from '@fortawesome/free-solid-svg-icons'

const euro = <FontAwesomeIcon icon={faEuroSign} color="#6c757d" />;

function Header(props) {
      const [show, setShow] = React.useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
    return(
        <header>
            <div className={styles.full_header }>
                <div className="container">
                    <div className="row justify-content-lg-around pt-4">
                        <div id={styles.logo}>
                            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                            <h4><span className={`${styles.logo_initials}`}>NG </span><span className={`${styles.logo_money} ${"font-weight-bold"}`}>Money</span></h4>
                        </div>
                       <div className={styles.money_amt}>
                           <h4 className={`${"px-4 pt-2"} ${styles.money_btn}`}>Add</h4>
                           <h4><span className="font-weight-bold">{props.money_amt.substr(0, props.money_amt.indexOf(','))}</span>
                               <span className={styles.fract_prt}>{props.money_amt.substr(props.money_amt.indexOf(','))} {euro}</span>
                           </h4>
                           <h4 className={`${"px-4 pt-2"} ${styles.money_btn}`}>Withdraw cash</h4>
                       </div>
                            <UnregUser handleShow={handleShow} handleClose={handleClose} show={show}/>
                            {/*<RegUser user_name={"nick"}/>*/}
                    </div>
                    <div className="row pt-3 pb-2">
                        <nav className={styles.top_menu}>
                            <ul className={`${"list-inline"} ${styles.list_menu}`}>
                                <li id="home-btn" className="list-inline-item mx-4"><NavLink exact to='/' activeClassName={styles.active_link}>Home</NavLink></li>
                                <li id="catalog-btn" className="list-inline-item mx-4"><NavLink to='/my_transactions' activeClassName={styles.active_link}>My transactions</NavLink></li>
                                <li id="my-books-btn" className="list-inline-item mx-4"><NavLink to='/payment_for_services' activeClassName={styles.active_link}>Payment for services</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header;