import React from "react";
import styles from "./Finance.module.css";


function Window(props) {
    const {items, title} = props;
    return (
        <div className={`mx-auto mt-3 d-flex justify-content-center ${styles.finance_page}`}>
            <div>
                <h4 className="my-3 d-flex justify-content-center font-weight-bold">{title}</h4>
                {items}
            </div>
        </div>
    )
}

export default Window;