package net.proselyte.jwtappdemo.service;


import net.proselyte.jwtappdemo.dto.TransactionDto;
import net.proselyte.jwtappdemo.model.Transaction;;

import java.util.List;

public interface TransactionService {
    Transaction register(Transaction transaction, TransactionDto transactionDto);
    List<TransactionContainer> findAllByUsername(String username, int page);
    List<Transaction> findAllByCard(String cardNumber);
    Boolean checkBalance(String cardNumber, double amount);
}
