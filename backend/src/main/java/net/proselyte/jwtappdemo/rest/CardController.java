package net.proselyte.jwtappdemo.rest;

import net.proselyte.jwtappdemo.dto.CardDto;
import net.proselyte.jwtappdemo.model.Card;
import net.proselyte.jwtappdemo.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping(value = "/cards")
public class CardController {
    private CardService cardService;
    public CardController(CardService cardService){
        this.cardService = cardService;
    }
    @PostMapping("/add")
    public ResponseEntity<Map<Object, Object>> registerCard(@RequestBody CardDto requestDto) {
        Map<Object, Object> response = new HashMap<>();
        response.put("card_number_error","false");
        boolean emailError =  cardService.existsByCardNumber(requestDto.getCardNumber());
        if(emailError){
            response.put("status", "error");
            response.put("card_number_error","true");
            return ResponseEntity.ok(response);
        }
        Card card = new Card();
        cardService.register(card, requestDto.getUsername(),requestDto);
        response.put("status", "ok");
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{card_number}")
    public ResponseEntity<Map<Object, Object>> getCardInfo(@PathVariable String card_number){
        Map<Object, Object> response = new HashMap<>();
        response.put("card_info", cardService.findByCardNumber(card_number));
        return ResponseEntity.ok(response);
    }
    @GetMapping("all/{username}")
    public ResponseEntity<Map<Object, Object>> getAllCards(@PathVariable String username){
        Map<Object, Object> response = new HashMap<>();
        response.put("cards", cardService.findAllByUsername(username));
        return ResponseEntity.ok(response);
    }
    @GetMapping(value="delete/{card_number}")
    public ResponseEntity<Map<Object, Object>> deleteCard(@PathVariable String card_number){
        Map<Object, Object> response = new HashMap<>();
        if(cardService.existsByCardNumber(card_number)) {
            cardService.deleteCard(card_number);
            response.put("status", "ok");
            return ResponseEntity.ok(response);
        }
        response.put("status", "error");
        return ResponseEntity.ok(response);
    }

}
