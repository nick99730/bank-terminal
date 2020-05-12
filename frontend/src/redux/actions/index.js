import store from "../store/index";

export const SET_USER_TRANSFERS = 'SET_USER_TRANSFERS';
export const SET_USER_TRANSACTIONS = 'SET_USER_TRANSACTIONS';
export const SET_USER_CARDS = 'SET_USER_CARDS';
export const SET_LOGGED_IN = "SET_LOGGED_IN";
export const SET_USERNAME = "SET_USERNAME";
export const SET_BALANCE = "SET_BALANCE";
export const TRANS_WINDOW_VISIBLE = "TRANS_WINDOW_VISIBLE";
export const TRANS_WINDOW_INVISIBLE = "TRANS_WINDOW_INVISIBLE";
export const SET_FILTER = "SET_FILTER";
export const SET_TERM = "SET_TERM";
export const SET_VISIBLE_ITEMS = "SET_VISIBLE_ITEMS";
export const RESET_STATE = "RESET_STATE";
export const SET_BENEFICIARIES = "SET_BENEFICIARIES";
export const SET_KIND_OF_BENEFICIARY = "SET_KIND_OF_BENEFICIARY";
export const SET_ID_BENEFICIARY = "SET_ID_BENEFICIARY";
export const INCREMENT_PAGE = "INCREMENT_PAGE";

export function setIdBeneficiary(id) {
    return {
        type: SET_ID_BENEFICIARY,
        id
    }
}

export function setFilter(filter) {
    return {
        type: SET_FILTER,
        filter
    }
}

export function incrementPage() {
    return {
        type: INCREMENT_PAGE,
    }
}

export function setBeneficiaries(beneficiaries) {
    return {
        type: SET_BENEFICIARIES,
        beneficiaries
    }
}

export function setVisibleItems(visibleItems) {
    return {
        type: SET_VISIBLE_ITEMS,
        visibleItems
    }
}

export function setTerm(term) {
    return {
        type: SET_TERM,
        term
    }
}

export function setKindOfBeneficiary(kind) {
    return {
        type: SET_KIND_OF_BENEFICIARY,
        kind
    }
}

export function setLoggedIn(loggedIn) {
    return {
        type: SET_LOGGED_IN,
        loggedIn
    }
}

export function setBalance(balance) {
    return {type: SET_BALANCE, balance}
}

export function setTransWindowVisible(id) {
    return {
        type: TRANS_WINDOW_VISIBLE,
        id
    }
}

export function setTransWindowInvisible() {
    return {
        type: TRANS_WINDOW_INVISIBLE,
    }
}

export const setUserCards = (cards) => {
    return {
        type: SET_USER_CARDS,
        cards
    }
};

export const setUserTransfers = (transfers) => {
    return {
        type: SET_USER_TRANSFERS, transfers
    }
};

export function setUserTransactions(transactions) {
    return {
        type: SET_USER_TRANSACTIONS, transactions
    }
}

export function setUsername(username) {
    return {
        type: SET_USERNAME,
        username
    }
}