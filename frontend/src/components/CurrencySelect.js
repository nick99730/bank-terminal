import React from "react";
import {faEuroSign} from '@fortawesome/free-solid-svg-icons'
import {faDollarSign} from '@fortawesome/free-solid-svg-icons'
import {faPoundSign} from '@fortawesome/free-solid-svg-icons'
import {faYenSign} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const euro = <FontAwesomeIcon icon={faEuroSign}/>;
const dollar = <FontAwesomeIcon icon={faDollarSign}/>;
const pound = <FontAwesomeIcon icon={faPoundSign}/>;
const yen = <FontAwesomeIcon icon={faYenSign}/>;
let CurrencySelect = {
    style: {
        control: (base, state) => ({
            ...base,
            boxShadow: "0 !important",
            borderColor: "#ced4da",
            backgroundColor: "#f6f5f3",
            color: '#6c757d',
            "&:hover": {
                borderColor: "#ced4da !important"
            },
            "&:focus": {
                borderColor: "#ced4da !important"
            },
            height: 30, fontSize: 15, width: '12rem',
        }),
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
            width: "12rem",
            borderRadius: 2,
            border: '1px solid #ced4da',
            marginTop: 5
        })
    },
    options: [
        {label: "Euro", value: "EUR", icon: euro},
        {label: "US Dollar", value: 'USD', icon: dollar},
        {label: "Pound Sterling", value: 'GBP', icon: pound},
        {label: "Japanese Yen", value: 'JPY', icon: yen}
    ]
};
export default CurrencySelect;