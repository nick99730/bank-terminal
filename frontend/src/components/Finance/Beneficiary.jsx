import React from "react";
import styles from "./Finance.module.css"
import {bindActionCreators} from "redux";
import {setIdBeneficiary} from "../../redux/actions";
import {connect} from "react-redux";

function Beneficiary(props) {
    const onClickBeneficiary = (id) => {
        console.log(id);
        props.setIdOfBeneficiary(id);
    };
    const {name, id} = props.beneficiary;
    const image_view = () => {
        if (name === "MTS") return <img src={window.location.origin + '/mts.png'}
                                        className={`${styles.image} d-block mx-auto`} alt="mts"/>;
        else if (name === "A1") return <img src={window.location.origin + '/a1.png'}
                                            className={`${styles.image} d-block mx-auto`} alt="a1"/>;
        else if (name === "Home Credit") return <img src={window.location.origin + '/home_credit.png'}
                                                     className={`${styles.image} d-block mx-auto`} alt="home credit"/>
    };
    return (
        <div className={`mx-3 d-inline-block mt-2 mb-3 py-2 ${styles.beneficiary}`} onClick={() => {
            onClickBeneficiary(id)
        }}>
            {image_view()}
            <h6 className="font-weight-bold d-flex justify-content-center my-2">{name}</h6>
            <button className={`mx-3 mt-2 shadow-none btn btn-warning d-block ${styles.btn}`}>Pay bill</button>
        </div>
    )
}

const putDispatchToProps = dispatch => bindActionCreators({
    setIdOfBeneficiary: setIdBeneficiary
}, dispatch);
export default connect(null, putDispatchToProps)(Beneficiary);