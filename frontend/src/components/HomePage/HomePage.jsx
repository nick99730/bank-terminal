import React from 'react';
import styles from './HomePage.module.css';
import Select from 'react-select'
import Transaction from "./Transaction/Transaction";
import SearchPanel from "./SearchPanel/SearchPanel";
import TransactionWindow from "./TrasactionWindow/TransactionWindow";
import SliderWindow from "./Slider/SliderWindow";
import PromoWindow from "./PromoWindow/PromoWindow";
import {bindActionCreators} from "redux";
import {incrementPage, setFilter, setUserTransactions, setUserTransfers} from "../../redux/actions/index";
import {connect} from "react-redux";
import {fetchTransactions, fetchTransfers, setVisibleOperations} from "../../redux/fetchUserInfo";

const options = [
    {label: "All transactions", value: 'all'},
    {label: "Transactions", value: 'transactions'},
    {label: "Transfers", value: 'transfers'},
];

const HomePage = (props) => {
    const {visibleItems, onFilterChange, isTransWindowVisible} = props;
    const style = {
        control: (base, state) => ({
            ...base,
            boxShadow: "0 !important",
            borderColor: "#6c757d",
            "&:hover": {
                borderColor: "#6c757d !important"
            },
            "&:focus": {
                borderColor: "#6c757d !important"
            },
            height: 30, fontSize: 15, width: 160, marginLeft: 70
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: 15,
            paddingBottom: 2,
            paddingTop: 2,
            "&:hover": {
                backgroundColor: "#ffea9e"
            },
            color: "black",
            backgroundColor: state.isSelected ? "white" : "white"

        }),
        menu: (state) => ({
            position: "absolute",
            zIndex: 999,
            marginLeft: 70,
            width: 160,
            borderRadius: 2,
            border: '1px solid #ced4da',
            marginTop: 5
        })
    };
    const onSelectChange = async (e) => {
        await onFilterChange(e.value);
        setVisibleOperations();
    };
    const onClickMore = async () => {
        await fetchTransfers(props.username, props.page + 1).then(transfers => {
            props.setTransfers(transfers.concat(props.transfers));
        });
        await fetchTransactions(props.username, props.page + 1).then(transactions => {
            props.setTransactions(transactions.concat(props.transactions));
        });
        props.incrementPage();
        setVisibleOperations();
    };
    const all_transactions = visibleItems.map(transaction => (
        <Transaction operation={transaction} key={transaction.id}/>));
    return (
        <div className={`d-flex justify-content-center ${styles.home}`}>
            <div className="flex-column">
                <SliderWindow/>
                <div className="d-flex">
                    <div className={`${styles.transactions} ${"px-2 my-3 py-3 ml-auto mr-3 text-center"}`}>
                        <div className="d-flex mb-3">
                            <h4 className={`mx-3`}>History</h4>
                            <Select options={options} styles={style} className="ml-4" onChange={onSelectChange}
                                    defaultValue={options[0]}/>
                        </div>
                        <SearchPanel/>
                        {all_transactions}
                        {props.transfers.length > 2 || props.transactions.length > 2 ?
                            <div onClick={onClickMore} className={`${'mt-2 d-inline-block'} ${styles.more_tr_btn}`}>
                                View more operations
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className="flex-column">
                <PromoWindow/>
                {isTransWindowVisible ? <TransactionWindow/> : null}
            </div>
        </div>
    );
};
const putDispatchToProps = dispatch => bindActionCreators({
    onFilterChange: setFilter,
    incrementPage: incrementPage,
    setTransfers: setUserTransfers,
    setTransactions: setUserTransactions
}, dispatch);
const putStateToProps = (state) => {
    return {
        username: state.username,
        page: state.page,
        visibleItems: state.visibleItems,
        transactions: state.transactions,
        transfers: state.transfers,
        isTransWindowVisible: state.isTransWindowVisible
    }
};
export default connect(putStateToProps, putDispatchToProps)(HomePage);