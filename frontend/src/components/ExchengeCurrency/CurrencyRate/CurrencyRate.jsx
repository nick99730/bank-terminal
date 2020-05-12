import React, {Component} from 'react'
import styles from "./CurrencyRate.module.css";
import {faEuroSign} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const euro = <FontAwesomeIcon icon={faEuroSign}/>;


class CurrencyRate extends Component {
    state = {
        isFetching: true,
        currencies: ['CHF', 'GBP', 'JPY', 'RUB', 'USD'],
        rates: [...Array(5).keys()].map((i) => {
            return ''
        })
    };

    async componentDidMount() {
        try {
            const myInit = {
                dataType: 'jsonp',
                method: 'GET',
            };
            setInterval(async () => {
                let new_rates = [];
                for (let i = 0; i < this.state.rates.length; i++) {
                    const testURL = `https://api.exchangeratesapi.io/latest?base=${this.state.currencies[i]}`;
                    const myRequest = new Request(testURL, myInit);
                    const res = await fetch(myRequest);
                    let serv_rates = await res.json();
                    new_rates.push(serv_rates.rates['EUR'].toFixed(4));
                }
                this.setState({
                    isFetching: false,
                });
                this.setState({
                    rates: new_rates
                })
            }, 10000);
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const {currencies, rates} = this.state;
        const build_arr = () => {
            let new_arr = [];
            for (let i = 0; i < rates.length; i++) {
                let rate = <div>{rates[i]} <span className={`font-weight-light ${styles.euro}`}>{euro}</span></div>;
                new_arr.push(<div className={`d-flex justify-content-center ${styles.item}`}>
                    <div className="mr-3 font-weight-bold">{currencies[i]}:
                    </div>
                    <div className="d-flex align-items-center">{this.state.isFetching ?
                        <img className={`${styles.loading}`} src={window.location.origin + '/Silver-Balls-Swinging.gif'}
                             alt="loading..."/> : rate}</div>
                </div>)
            }
            return new_arr
        };
        const total_arr = build_arr();
        return (
            <div className={`${styles.rates} mx-auto my-3 py-3`}>
                <div className="d-flex justify-content-center font-weight-bold mb-2">Euro rate</div>
                {total_arr}
            </div>
        )
    }
}

export default CurrencyRate;