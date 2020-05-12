package net.proselyte.jwtappdemo.service;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TransferContainer {
    private String from_card_number;
    private String to_card_number;
    private double amount;
    private Date date;
    private String to;
    private String from;
    private String type="transfer";
    private String details;
    private Long id;
    public TransferContainer(
                             Long id,
                             String from_card_number,
                             String to_card_number,
                             double amount,
                             Date date,
                             String to,
                             String from,
                             String details) {
        this.id = id;
        this.from_card_number = from_card_number;
        this.to_card_number = to_card_number;
        this.amount = amount;
        this.date = date;
        this.to = to;
        this.from = from;
        this.details = details;
    }
}
