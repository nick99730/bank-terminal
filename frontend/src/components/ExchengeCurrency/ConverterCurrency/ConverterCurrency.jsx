import React, {Component} from 'react'
import styles from "./ConverterCurrency.module.css";
import Select from "react-select";
import {faEuroSign} from '@fortawesome/free-solid-svg-icons'
import {faDollarSign} from '@fortawesome/free-solid-svg-icons'
import {faPoundSign} from '@fortawesome/free-solid-svg-icons'
import {faYenSign} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CurrencySelect from "../../CurrencySelect";

const euro = <FontAwesomeIcon icon={faEuroSign}/>;
const dollar = <FontAwesomeIcon icon={faDollarSign}/>;
const pound = <FontAwesomeIcon icon={faPoundSign}/>;
const yen = <FontAwesomeIcon icon={faYenSign}/>;

class ConverterCurrency extends Component {
    state = {
        fromCurrency: 'EUR',
        toCurrency: 'USD',
        amount: 0,
        result: '',
        isLoaded: false,
    };
    onChangeField = (key, value) => {
        this.setState({[key]: value}, () => this.convCurr());
    };
    convCurr = () => {
        if (this.state.fromCurrency !== this.state.toCurrency && this.state.amount !== 0) {
            const testURL = `https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}`;
            const myInit = {
                dataType: 'jsonp',
                method: 'GET',
            };
            const myRequest = new Request(testURL, myInit);
            fetch(myRequest).then(response => response.json()).then((json) => {
                const result = this.state.amount * (json.rates[this.state.toCurrency]);
                if (!Number.isNaN(result))
                    this.setState({result: result.toFixed(2)})
            }).catch(function (e) {
                console.log('error');
                console.log(e);
            });
        }
    };

    render() {
        const customSingleValue = ({data}) => (
            <div className="input-select">
                <div className="input-select__single-value">
                    {data.icon && <span className="input-select__icon">{data.icon}</span>}
                    <span>{data.label}</span>
                </div>
            </div>
        );
        const {options, style} = CurrencySelect;
        const {result} = this.state;
        return (
            <div className={`${styles.exchange_block} my-3 mx-auto`}>
                <div className={`font-weight-bold d-flex justify-content-center pt-4 ${styles.title}`}>Convert
                    currency
                </div>
                <div className="mb-3 ml-3 mt-4">
                    <div className="d-flex justify-content-around">
                        <div className="">
                            <label className={`font-weight-bold ${styles.d_block}`} htmlFor="FromSelect">From</label>
                            <Select options={options} onChange={(e) => this.onChangeField('fromCurrency', e.value)}
                                    id="FromSelect" components={{SingleValue: customSingleValue}} styles={style}
                                    className={` ${styles.select}`} defaultValue={options[0]}/>
                        </div>
                        <div>
                            <label className="font-weight-bold" htmlFor="ToSelect">To</label>
                            <Select options={options} onChange={(e) => this.onChangeField('toCurrency', e.value)}
                                    id="ToSelect" components={{SingleValue: customSingleValue}} styles={style}
                                    className={` ${styles.select}`} defaultValue={options[1]}/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around pt-4 pb-4">
                        <div>
                            <label htmlFor="AmountInput" className={`font-weight-bold`}>Amount</label>
                            <input type="text" onChange={(e) => {
                                this.onChangeField('amount', e.target.value)
                            }} id="AmountInput"
                                   className={` form-control mr-1 ${styles.form_control} ${styles.no_shadow}`}
                                   placeholder="Amount" aria-label="Amount"/>
                        </div>
                        <div className="">
                            <label className="font-weight-bold" htmlFor="Result">Result</label>
                            <input id="Result" value={result}
                                   className={` form-control mr-1 ${styles.form_control} ${styles.no_shadow}`}
                                   type="text" placeholder="Result" readOnly/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConverterCurrency;