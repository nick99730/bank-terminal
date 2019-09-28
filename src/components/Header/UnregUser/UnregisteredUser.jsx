import React from 'react';
import styles from './UnregisteredUser.module.css';
import ModalWindow from "../ModalWindow/ModalWindow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
const sign_in = <FontAwesomeIcon icon={faSignInAlt} color="#6c757d" />;


function UnregUser(props) {
    return(
          <div className={styles.my_account}>
              <ul className={`${"list-inline"} ${styles.list_account}`}>
                  <li id="log-in-btn" className="list-inline-item" onClick={props.handleShow}>
                      {sign_in} Log in
                  </li>
                  <li id="sign-up-btn" className="list-inline-item">Sign up</li>
              </ul>
              <ModalWindow show={props.show} handleClose={props.handleClose}/>
          </div>
    );
}
export default UnregUser;