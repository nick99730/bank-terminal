import React, {Component} from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import styles from './App.module.css'
import SignUpPage from "./components/SignUpPage/SignUpPage";
import Exchange from "./components/ExchengeCurrency/Exchange";
import SuccessfullyRegistration from "./components/SignUpPage/SuccessfullyRegistration";
import MyCardsPage from "./components/MyCards/MyCardsPage";
import {Route} from "react-router-dom";
import {Provider} from "react-redux"
import {BrowserRouter as Router} from "react-router-dom"
import Finance from "./components/Finance/Finance";
import {getVisibleItems} from "./redux/fetchUserInfo";

class App extends Component {
    //state = {
    //    term:'',
    //    filter:'all',
    //    isTransWindowVisible:false,
    //    transaction:{}
    //};
    filter(items, filter) {
        switch (filter.value) {
            case 'all':
                return items;
            case 'transactions':
                return items.filter((item) => item.type === 'transfer');
            case 'transfers':
                return items.filter((item) => item.type === 'transaction');
            default:
                return items;
        }
    }

    search(items, term) {
        if (term.length === 0) return items;
        return items.filter((item) => {
            return item.details.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    };

    //closeTransactionWindow = ()=> {
    //    this.setState(({isTransWindowVisible}) => {
    //        let new_state = false;
    //        return {
    //            isTransWindowVisible: new_state
    //        }
    //    });
    //};
    //onTransactionClick = (id)=>{
    //    this.setState(({isTransWindowVisible})=>{
    //        let new_state = true;
    //        return{
    //            isTransWindowVisible: new_state            }
    //    });
    //    this.setState(({transaction})=>{
    //        return{
    //            transaction:this.props.state.userInfo.transactions[parseInt(id)-1]
    //        }
    //    });
    //};
    //onSearchChange = (term)=>{
    //    this.closeTransactionWindow();
    //    this.setState({term});
    //};
    //onFilterChange = (filter)=>{
    //    this.closeTransactionWindow();
    //    this.setState({filter});
    //};
    render() {
        let {store} = this.props;
        //const {userInfo} = this.props.state;
        //const {term, filter, isTransWindowVisible, transaction} = this.state;
        //const visibleItems = this.filter(this.search(getVisibleItems(), term), this.filter);
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <div className={styles.content}>
                            <Header/>
                            <Route exact path='/' render={() => <HomePage/>}/>
                            <Route path='/thank_you' render={() => <SuccessfullyRegistration/>}/>
                            <Route path='/sign_up' render={() => <SignUpPage/>}/>
                            <Route path='/my_cards' render={() => <MyCardsPage/>}/>
                            <Route path='/exchange' render={() => <Exchange/>}/>
                            <Route path='/finance' render={() => <Finance/>}/>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
