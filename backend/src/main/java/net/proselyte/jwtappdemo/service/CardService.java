package net.proselyte.jwtappdemo.service;

import net.proselyte.jwtappdemo.dto.CardDto;
import net.proselyte.jwtappdemo.model.Card;
import net.proselyte.jwtappdemo.model.User;

import java.util.List;

public interface CardService {
    Card register(Card card, String username, CardDto cardDto);
    Card findByCardNumber(String number);
    List<CardContainer> findAllByUsername(String username);
    List<Card> getCardsByUserId(Long id);
    void deleteCard(String number);
    Boolean checkBalance(String card_number, double amount);
    Boolean existsByCardNumber(String number);
}
