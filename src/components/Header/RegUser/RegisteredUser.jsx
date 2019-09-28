import React from 'react';
import styles from './RegisteredUser.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faUser} color="#6c757d" />;

function Reg_user(props) {
    return(
          <div className={`${"col-lg-3 col-md-4 p-2"} ${styles.my_account}`}>
                            <ul className={`${"list-inline"} ${styles.list_account}`}>
                                <li id={styles.user_name} className="list-inline-item">
                                    {element}{props.user_name}</li>
                                <li id={styles.log_out} className="list-inline-item">Log out</li>
                            </ul>
                        </div>
    );
}

export default Reg_user;