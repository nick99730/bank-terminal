import React, {useEffect} from "react";
import Beneficiary from "./Beneficiary";
import styles from "./Finance.module.css"
import AddTransfer from "./AddTransfer";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    setBalance, setIdBeneficiary,
    setKindOfBeneficiary,
    setUserCards,
    setUserTransactions,
    setUserTransfers
} from "../../redux/actions";
import Window from "./Window";
import KindOfBeneficiary from "./KindOfBeneficiary";
import AddTransaction from "./AddTransactions";


function Finance(props) {
    useEffect(function () {
        return function cleanup() {
            props.setKindOfBeneficiary('');
            props.setIdBeneficiary(0)
        }
    }, []);

    const {username, setBalance, setUserCards, setIdBeneficiary, setKindOfBeneficiary, setTransfers, setTransactions, cards, beneficiaries, kindOfBeneficiary, idBeneficiary} = props;
    const filter = (items, filter) => {
        switch (filter) {
            case 'bank':
                return items.filter((item) => item.type === 'bank');
            case 'mobile':
                return items.filter((item) => item.type === 'mobile');
            default:
                return []
        }
    };
    const setTitle = (kind) => {
        if (kind === 'bank') return 'Choose your bank';
        else if (kind === 'mobile') return 'Choose your mobile operator'
        else return ''
    };
    const kindsOfBeneficiaries = [{id: 1, description: "Pay both taxes and penalties.", kind: "taxes", name: "Taxes"},
        {
            id: 2,
            description: "Add money to your mobile phone account with your bank card.",
            kind: "mobile",
            name: "Cell phone"
        },
        {id: 3, description: "Pay your monthly loan payment to any bank.", kind: "bank", name: "Loans"}];
    const all_kinds = kindsOfBeneficiaries.map(kind => (<KindOfBeneficiary kindOfBeneficiary={kind} key={kind.id}/>));
    const all_beneficiaries = filter(beneficiaries, kindOfBeneficiary).map(beneficiary => (
        <Beneficiary beneficiary={beneficiary} key={beneficiary.id}/>));
    return (<div>
            {props.cards.length === 0 ?
                <div className={`${styles.finance_container}`}>
                    <div className={`mx-auto mt-3 py-3 d-flex justify-content-center ${styles.finance_page}`}>To make
                        payments and transfers you need to add a bank card!
                    </div>
                </div>
                :
                <div className={styles.finance_container}>
                    {props.kindOfBeneficiary === '' || props.kindOfBeneficiary === 'taxes' || props.idBeneficiary !== 0 ? null :
                        <div className="d-flex justify-content-center">
                            <Window items={all_beneficiaries} title={setTitle(kindOfBeneficiary)}/>
                        </div>
                    }
                    {props.kindOfBeneficiary !== '' ? null : <Window items={all_kinds} title={"POPULAR SERVICES"}/>}
                    {props.idBeneficiary !== 0 || props.kindOfBeneficiary === 'taxes' ?
                        <div className={`mx-auto mt-3 d-flex justify-content-center ${styles.finance_page}`}>
                            <div>
                                <h4 className="my-3 d-flex justify-content-center font-weight-bold">Add transaction</h4>
                                <AddTransaction setKindOfBeneficiary={setKindOfBeneficiary}
                                                setIdBeneficiary={setIdBeneficiary} username={username} cards={cards}
                                                to={idBeneficiary} setTransactions={setTransactions}
                                                setUserCards={setUserCards} setBalance={setBalance}/>
                            </div>
                        </div>
                        : null}
                    <div className={`mx-auto mt-3 d-flex justify-content-center ${styles.finance_page}`}>
                        <div>
                            <h4 className="my-3 d-flex justify-content-center font-weight-bold">Add transfer</h4>
                            <AddTransfer username={username} setBalance={setBalance} setUserCards={setUserCards}
                                         setTransfers={setTransfers} cards={cards}/>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

const putStateToProps = (state) => {
    return {
        idBeneficiary: state.idBeneficiary,
        kindOfBeneficiary: state.kindOfBeneficiary,
        username: state.username,
        cards: state.cards,
        beneficiaries: state.beneficiaries
    }
};
const putDispatchToProps = dispatch => bindActionCreators({
    setKindOfBeneficiary: setKindOfBeneficiary,
    setIdBeneficiary: setIdBeneficiary,
    setUserCards: setUserCards,
    setBalance: setBalance,
    setTransactions: setUserTransactions,
    setTransfers: setUserTransfers
}, dispatch);
export default connect(putStateToProps, putDispatchToProps)(Finance);