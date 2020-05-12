package net.proselyte.jwtappdemo.service.impl;

import lombok.extern.slf4j.Slf4j;
import net.proselyte.jwtappdemo.dto.TransactionDto;
import net.proselyte.jwtappdemo.model.Beneficiary;
import net.proselyte.jwtappdemo.model.Card;
import net.proselyte.jwtappdemo.model.Transaction;
import net.proselyte.jwtappdemo.model.User;
import net.proselyte.jwtappdemo.repository.BeneficiaryRepository;
import net.proselyte.jwtappdemo.repository.CardRepository;
import net.proselyte.jwtappdemo.repository.TransactionRepository;
import net.proselyte.jwtappdemo.repository.UserRepository;
import net.proselyte.jwtappdemo.service.TransactionContainer;
import net.proselyte.jwtappdemo.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class TransactionServiceImpl implements TransactionService {
    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final TransactionRepository transactionRepository;
    private final BeneficiaryRepository beneficiaryRepository;

    @Autowired
    public TransactionServiceImpl(UserRepository userRepository,
                                  CardRepository cardRepository,
                                  TransactionRepository transactionRepository,
                                  BeneficiaryRepository beneficiaryRepository) {
        this.userRepository = userRepository;
        this.cardRepository = cardRepository;;
        this.transactionRepository = transactionRepository;
        this.beneficiaryRepository = beneficiaryRepository;
    }

    @Override
    public Transaction register(Transaction transaction, TransactionDto transactionDto) {
        Card card = cardRepository.findByCardNumber(transactionDto.getCardNumber());
        Optional<Beneficiary> beneficiary_object = beneficiaryRepository.findById(transactionDto.getBeneficiaryId());
        if(beneficiary_object.isPresent()){
            card.setBalance(card.getBalance()-transactionDto.getAmount());
            Beneficiary beneficiary = beneficiary_object.get();
            beneficiary.setBalance(beneficiary.getBalance()+transactionDto.getAmount());
            transaction.setAmount(transactionDto.getAmount());
            transaction.setFrom(card.getCardholderUser());
            transaction.setCard(card);
            transaction.setDetails("Payment by " + transactionDto.getDetails() + " for " + beneficiary.getName());
            transaction.setTo(beneficiary);
            transaction.setCreatedDate(new Date());
            return transactionRepository.save(transaction);
        }
        return null;
    }

    @Override
    public List<TransactionContainer> findAllByUsername(String username, int page) {
        Pageable paging = PageRequest.of(page, 3, Sort.by("createdDate").descending());
        User user = userRepository.findByUsername(username);
        List<Transaction> transactions = transactionRepository.findAllByFrom(user, paging);
        ArrayList<TransactionContainer> transactionContainers = new ArrayList<>();
        for (Transaction transaction:transactions) {
            transactionContainers.add(new TransactionContainer(
                    transaction.getId(),
                    transaction.getCard().getCardNumber(),
                    transaction.getDetails(),
                    transaction.getTo().getName(),
                    transaction.getAmount(),
                    transaction.getCreatedDate()));
        }
        return transactionContainers;
    }

    @Override
    public List<Transaction> findAllByCard(String cardNumber) {
        Card card = cardRepository.findByCardNumber(cardNumber);
        return transactionRepository.findAllByCard(card);
    }

    @Override
    public Boolean checkBalance(String cardNumber, double amount) {
        Card card = cardRepository.findByCardNumber(cardNumber);
        return card.getBalance() > amount;
    }
}
