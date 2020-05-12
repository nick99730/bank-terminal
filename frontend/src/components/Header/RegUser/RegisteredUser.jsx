import React from 'react';
import styles from './RegisteredUser.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {connect} from "react-redux";

const element = <FontAwesomeIcon icon={faUser} color="#6c757d"/>;

function Reg_user(props) {
    const logOut = () => {
        document.location.reload(true);
    };
    return (
        <div className={`${"col-lg-3 col-md-4 p-2"} ${styles.my_account}`}>
            <ul className={`${"list-inline"} ${styles.list_account}`}>
                <li id={styles.user_name} className="list-inline-item">
                    {element}{props.username}</li>
                <li id={styles.log_out} onClick={logOut} className="list-inline-item">Log out</li>
            </ul>
        </div>
    );
}

const putStateToHeaderProps = (state) => {
    return {
        username: state.username
    }
};
export default connect(putStateToHeaderProps)(Reg_user);