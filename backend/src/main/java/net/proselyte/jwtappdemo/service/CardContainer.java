package net.proselyte.jwtappdemo.service;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CardContainer {
    private String cardNumber;
    private double balance;

    public CardContainer(String cardNumber, double balance) {
        this.cardNumber = cardNumber;
        this.balance = balance;
    }
}
