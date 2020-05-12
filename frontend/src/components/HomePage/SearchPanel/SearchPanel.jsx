import React from 'react'
import styles from "./SearchPanel.module.css";
import {bindActionCreators} from "redux";
import {setTerm} from "../../../redux/actions/index";
import {connect} from "react-redux";
import {setVisibleOperations} from "../../../redux/fetchUserInfo";

const SearchPanel = (props) => {
    const onSearchChange = async (e) => {
        await props.onSearchChange(e.target.value);
        setVisibleOperations();
    };
    return (
        <div className="input-group mb-3">
            <input type="text" className={`${"form-control"} ${styles.form_control} ${styles.no_shadow}`}
                   placeholder="Transfer or transaction"
                   aria-label="Payment, transfer or deposit" aria-describedby="basic-addon2" value={props.term}
                   onChange={onSearchChange}/>
        </div>
    )
};
const putDispatchToProps = dispatch => bindActionCreators({
    onSearchChange: setTerm,
}, dispatch);
const putStateToProps = (state) => {
    return {
        term: state.term
    }
};
export default connect(putStateToProps, putDispatchToProps)(SearchPanel);