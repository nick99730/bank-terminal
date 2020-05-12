package net.proselyte.jwtappdemo.service;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TransactionContainer {
    private Long id;
    private String cardNumber;
    private String details;
    private String beneficiary;
    private double amount;
    private Date date;
    private String type="transaction";

    public TransactionContainer(
                                Long id,
                                String cardNumber,
                                String details,
                                String beneficiary,
                                double amount,
                                Date date) {
        this.id = id;
        this.cardNumber = cardNumber;
        this.details = details;
        this.beneficiary = beneficiary;
        this.amount = amount;
        this.date = date;
    }
}
