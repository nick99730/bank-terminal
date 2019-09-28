import React,{Component} from 'react';
import styles from './HomePage.module.css';
import Select from 'react-select'
import Transaction from "./Transaction/Transaction";
import SearchPanel from "./SearchPanel/SearchPanel";

const options = [
    { label: "All transactions", value: 'all' },
    { label: "Payments", value: 'payments' },
    { label: "Transfers", value: 'transfers' },
    { label: "Deposits", value: 'deposits'}
];

class HomePage extends Component{
    render() {
        const {visibleItems, onSearchChange, onFilterChange} = this.props;
        const style = {
            control: (base, state) => ({
                ...base,
                boxShadow: "0 !important",
                borderColor:"#6c757d",
                "&:hover": {
                    borderColor: "#6c757d !important"
                },
                "&:focus": {
                    borderColor: "#6c757d !important"
                },
                height: 30, fontSize:15, width: 160, marginLeft:70
            }),
            option: (provided, state) => ({
                ...provided,
                fontSize:15,
                paddingBottom: 2,
                paddingTop:2,
                "&:hover": {
                    backgroundColor: "#ffea9e"
                },
                color:"black",
                backgroundColor:state.isSelected ? "white" : "white"

            }),
            menu:(state)=>({
                position: "absolute",
                zIndex:999,
                marginLeft:70,
                width:160,
                borderRadius:2,
                border: '1px solid #ced4da',
                marginTop:5
            })
        };
        const all_transactions = visibleItems.map(transaction=>(<Transaction{...transaction} key={transaction.id}/>));
        return(
                <div className={`${styles.transactions} ${"px-2 my-3 py-3 pb-md-4 mx-auto text-center"}`}>
                    <div className="d-flex mb-3">
                        <h4 className="mx-3">History</h4>
                        <Select options={options} styles={style} className="ml-4" onChange={(value) => onFilterChange(value)} defaultValue={options[0]} />
                    </div>
                    <SearchPanel onSearchChange={onSearchChange}/>
                    {all_transactions}
                    <div className={`${'mt-2 d-inline-block'} ${styles.more_tr_btn}`}>
                        View more transactions
                    </div>
                </div>
        );
    }
}

export default HomePage;