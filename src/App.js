import React, {Component} from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import {Route} from "react-router-dom";
import styles from './App.module.css'

class App extends Component{

    state = {
        term:'',
        filter:'all'
    };
    filter(items, filter){
        switch (filter.value) {
            case 'all':
                return items;
            case 'payments':
                return items.filter((item)=> item.type === 'payment');
            case 'deposits':
                return items.filter((item)=>item.type === 'deposit');
            case 'transfers':
                return items.filter((item)=>item.type === 'transfer_deposit' || item.type === 'transfer_payment');
            default:
                return items;
        }
    }
    search(items, term){
        if(term.length === 0) return items;
        return items.filter((item)=>{
            return item.description.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    };
    onSearchChange = (term)=>{
        this.setState({term});
    };
    onFilterChange = (filter)=>{
        this.setState({filter});
    };
    render() {
        const {userInfo} = this.props.state;
        const {term, filter} = this.state;
        const visibleItems = this.filter(this.search(userInfo.transactions, term), filter);
        return (
            <div className="App">
                <div className={styles.content}>
                    <Header money_amt={userInfo.money_amt}/>
                    <Route exact path='/' render={ ()=> <HomePage transactions={userInfo.transactions}
                                                                  visibleItems={visibleItems}
                                                                  onFilterChange={this.onFilterChange}
                                                                  onSearchChange={this.onSearchChange}/> }/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
