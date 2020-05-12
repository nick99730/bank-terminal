import store from "../redux/store"
import {setVisibleItems} from "./actions";

let authToken = JSON.parse(localStorage.getItem('token'));
let settings = {
    mode: 'cors',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + authToken,
        'Origin': 'Access-Control-Allow-Origin',
    }
};
export const getBalance = () => {
    return new Promise(function (resolve, reject) {
        if (store.getState().cards.length === 0) {
            resolve(0);
        } else {
            const cards = store.getState().cards;
            resolve(cards.reduce((a, card) => a + card.balance, 0));
        }
    })
};
export const fetchBeneficiaries = () => {
    return new Promise(function (resolve, reject) {
        fetch("http://localhost:8080/beneficiaries/all/", settings)
            .then(response => response.json()).then((json) => {
            if (json.beneficiaries.length !== 0) {
                resolve(json.beneficiaries);
            } else resolve([])
        }).catch(
            function (e) {
                console.log('error');
                console.log(e);
            });
    })
};
export const fetchCards = function (username) {
    return new Promise(function (resolve, reject) {
        fetch(`http://localhost:8080/cards/all/${username}`, settings)
            .then(response => response.json()).then((json) => {
            if (json.cards.length !== 0) {
                resolve(json.cards);
            } else resolve([])
        }).catch(
            function (e) {
                console.log('error');
                console.log(e);
            });
    })
};
export const fetchTransfers = function (username, page_number) {
    return new Promise(function (resolve, reject) {
        fetch(`http://localhost:8080/transfers/all/${username}/${page_number}`, settings)
            .then(response => response.json()).then((json) => {
            if (json.transfers.length === 0) resolve([]);
            resolve(json.transfers);
            //resolve(json.transfers.concat(store.getState().transfers));
        }).catch(
            function (e) {
                console.log('error');
                console.log(e);
            });
    })
};
export const fetchTransactions = function (username, page_number) {
    return new Promise(function (resolve, reject) {
        fetch(`http://localhost:8080/transactions/all/${username}/${page_number}`, settings)
            .then(response => response.json()).then((json) => {
            if (json.transactions.length === 0) resolve([]);
            resolve(json.transactions);
            //resolve(json.transactions.concat(store.getState().transactions));
        }).catch(
            function (e) {
                console.log('error');
                console.log(e);
            });
    })
};
const search = (items, term) => {
    if (term.length === 0) return items;
    return items.filter((item) => {
        return item.details.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
};
const filter = (items, filter) => {
    switch (filter) {
        case 'all':
            return items;
        case 'transactions':
            return items.filter((item) => item.type === 'transaction');
        case 'transfers':
            return items.filter((item) => item.type === 'transfer');
        default:
            return items;
    }
};

export const getVisibleItems = () => {
    return store.getState().transactions.concat(store.getState().transfers).sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
    })
};

export const setVisibleOperations = async () => {
    let items = await filter(search(getVisibleItems(), store.getState().term), store.getState().filter);
    store.dispatch(setVisibleItems(items))
};