package net.proselyte.jwtappdemo.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import net.proselyte.jwtappdemo.model.Card;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CardDto {
    @NotBlank
    private String cardholderName;
    @Digits(integer=3, fraction=0)
    private int cvc;
    @Size(min = 3, max = 3)
    private String currency;
    @NotBlank
    private String username;
    @Size(min = 4, max = 4)
    private String expiry;
    @Size(min = 16, max = 16)
    private String cardNumber;
    public static CardDto fromCard(Card card){
        CardDto cardDto = new CardDto();
        cardDto.setCardNumber(card.getCardNumber());
        cardDto.setCardholderName(card.getCardholderName());
        cardDto.setCvc(card.getCvc());
        return cardDto;
    }
    public static Card toCard(CardDto cardDto){
        Card card = new Card();
        card.setCardNumber(cardDto.getCardNumber());
        card.setCardholderName(cardDto.getCardholderName());
        card.setCvc(cardDto.getCvc());
        return card;
    }
}
