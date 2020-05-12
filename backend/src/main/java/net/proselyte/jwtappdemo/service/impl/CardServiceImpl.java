package net.proselyte.jwtappdemo.service.impl;

import lombok.extern.slf4j.Slf4j;
import net.proselyte.jwtappdemo.dto.CardDto;
import net.proselyte.jwtappdemo.model.Card;
import net.proselyte.jwtappdemo.model.Transaction;
import net.proselyte.jwtappdemo.model.Transfer;
import net.proselyte.jwtappdemo.model.User;
import net.proselyte.jwtappdemo.repository.CardRepository;
import net.proselyte.jwtappdemo.repository.TransactionRepository;
import net.proselyte.jwtappdemo.repository.TransferRepository;
import net.proselyte.jwtappdemo.repository.UserRepository;
import net.proselyte.jwtappdemo.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.proselyte.jwtappdemo.service.CardContainer;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CardServiceImpl implements CardService {
    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final TransferRepository transferRepository;
    @Autowired
    public CardServiceImpl(CardRepository cardRepository, UserRepository userRepository, TransactionRepository transactionRepository, TransferRepository transferRepository){
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.transferRepository = transferRepository;
    }
    @Override
    public Card register(Card card, String username, CardDto cardDto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyy");
        User user = userRepository.findByUsername(username);
        card = CardDto.toCard(cardDto);
        card.setBalance(1000.0);
        card.setCardholderUser(user);
        LocalDate expiry_date = LocalDate.parse("01" + cardDto.getExpiry(), formatter);
        expiry_date = expiry_date.plusMonths(1);
        card.setExpiry(expiry_date);
        return cardRepository.save(card);
    }

    @Override
    public Card findByCardNumber(String number) {
        return cardRepository.findByCardNumber(number);
    }

    @Override
    public List<CardContainer> findAllByUsername(String username) {
        User user = userRepository.findByUsername(username);
        List<Card> cards = cardRepository.findAllByCardholderUser(user);
        ArrayList<CardContainer> resultCards = new ArrayList<>();
        for (Card card:cards) {
            resultCards.add(new CardContainer(card.getCardNumber(),
                    card.getBalance()));
        }
        return resultCards;
    }

    @Override
    public List<Card> getCardsByUserId(Long id) {
        Optional<User> user = userRepository.findById(id);
        List<Card> cards = null;
        if(user.isPresent()) {
            cards = cardRepository.findAllByCardholderUser(user.get());
        }
        return cards;
    }

    @Override
    public void deleteCard(String number) {
        Card card = cardRepository.findByCardNumber(number);
        List<Transaction> transactions = transactionRepository.findAllByCard(card);
        List<Transfer> transfers_from = transferRepository.findAllByFromCard(card);
        List<Transfer> transfers_to = transferRepository.findAllByToCard(card);
        for (Transaction transaction:transactions) {
            transactionRepository.deleteById(transaction.getId());
        }
        for (Transfer transfer_to:transfers_to) {
            transferRepository.deleteById(transfer_to.getId());
        }
        for (Transfer transfer_from:transfers_from) {
            transferRepository.deleteById(transfer_from.getId());
        }
        cardRepository.deleteById(card.getId());
    }

    @Override
    public Boolean checkBalance(String card_number, double amount) {
        Card card = cardRepository.findByCardNumber(card_number);
        return card.getBalance()>=amount;
    }

    @Override
    public Boolean existsByCardNumber(String number) {
        return cardRepository.findByCardNumber(number) != null;
    }
}
