package net.proselyte.jwtappdemo.service;

import lombok.Getter;
import lombok.Setter;
import net.proselyte.jwtappdemo.model.Card;
import net.proselyte.jwtappdemo.model.Transaction;
import net.proselyte.jwtappdemo.model.Transfer;

import java.util.List;

@Getter
@Setter
public class UserContainer {
    private String username;
    private List<Transfer> transfers;
    private List<Transaction> transactions;
    private List<Card> cards;

    public UserContainer(String username,
                         List<Transfer> transfers,
                         List<Transaction> transactions,
                         List<Card> cards) {
        this.username = username;
        this.transfers = transfers;
        this.transactions = transactions;
        this.cards = cards;
    }
}
