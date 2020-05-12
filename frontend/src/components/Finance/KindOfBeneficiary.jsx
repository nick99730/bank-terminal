import styles from "./Finance.module.css";
import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setIdBeneficiary, setKindOfBeneficiary} from "../../redux/actions";

function KindOfBeneficiary(props) {
    const {name, description, kind} = props.kindOfBeneficiary;
    const image_view = () => {
        if (name === "Taxes") return <img src={window.location.origin + '/taxes.png'}
                                          className={`${styles.image} d-block mx-auto`} alt="mts"/>;
        else if (name === "Loans") return <img src={window.location.origin + '/loans.png'}
                                               className={`${styles.image} d-block mx-auto`} alt="a1"/>
        else if (name === "Cell phone") return <img src={window.location.origin + '/mobile.png'}
                                                    className={`${styles.image} d-block mx-auto`} alt="a1"/>
    };
    const onKindClick = (kind) => {
        if (kind === 'taxes') props.setIdOfBeneficiary(3);
        props.setKindOfBeneficiary(kind);
    };
    return (
        <div className={`d-flex justify-content-center my-3 py-2 ${styles.kind}`} onClick={() => onKindClick(kind)}>
            <div className="">
                {image_view()}
                <h6 className="my-2 d-flex justify-content-center font-weight-bold">{name}</h6>
                <div className="text_center">
                    {description}
                </div>
            </div>
        </div>
    )
}

const putDispatchToProps = dispatch => bindActionCreators({
    setKindOfBeneficiary: setKindOfBeneficiary,
    setIdOfBeneficiary: setIdBeneficiary
}, dispatch);
export default connect(null, putDispatchToProps)(KindOfBeneficiary);