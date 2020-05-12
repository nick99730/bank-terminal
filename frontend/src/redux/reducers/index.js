export let initialState = {
    username: '',
    balance: 0,
    cards: [],
    transactions: [],
    transfers: [],
    loggedIn: false,
    isTransWindowVisible: false,
    idOperation: 0,
    idBeneficiary: 0,
    term: '',
    filter: 'all',
    visibleItems: [],
    beneficiaries: [],
    kindOfBeneficiary: '',
    page: 0
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "INCREMENT_PAGE":
            return {
                ...state,
                page: state.page + 1
            };
        case "SET_KIND_OF_BENEFICIARY":
            return {
                ...state,
                kindOfBeneficiary: action.kind
            };
        case "SET_ID_BENEFICIARY":
            return {
                ...state,
                idBeneficiary: action.id
            };
        case "SET_BENEFICIARIES":
            return {
                ...state,
                beneficiaries: action.beneficiaries
            };
        case "SET_VISIBLE_ITEMS":
            return {
                ...state,
                visibleItems: action.visibleItems
            };
        case "SET_FILTER":
            return {
                ...state,
                isTransWindowVisible: false,
                filter: action.filter
            };
        case "SET_USERNAME":
            return {
                ...state,
                username: action.username
            };
        case "SET_TERM":
            return {
                ...state,
                isTransWindowVisible: false,
                term: action.term
            };
        case "TRANS_WINDOW_INVISIBLE":
            return {
                ...state,
                isTransWindowVisible: false
            };
        case "TRANS_WINDOW_VISIBLE":
            return {
                ...state,
                idOperation: action.id,
                isTransWindowVisible: true
            };
        case "SET_BALANCE":
            return {
                ...state,
                balance: action.balance
            };
        case "SET_USER_CARDS":
            return {
                ...state,
                cards: action.cards
            };
        case "SET_USER_TRANSFERS":
            return {
                ...state,
                transfers: action.transfers
            };
        case "SET_USER_TRANSACTIONS":
            return {
                ...state,
                transactions: action.transactions
            };
        case "SET_LOGGED_IN":
            return {
                ...state,
                loggedIn: action.loggedIn
            };
        default:
            return state;
    }
}

export default rootReducer;