package net.proselyte.jwtappdemo.rest;

import net.proselyte.jwtappdemo.dto.TransferDto;
import net.proselyte.jwtappdemo.model.Transfer;
import net.proselyte.jwtappdemo.service.CardService;
import net.proselyte.jwtappdemo.service.TransferContainer;
import net.proselyte.jwtappdemo.service.TransferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping(value = "/transfers")
public class TransferController {
    private final TransferService transferService;
    private final CardService cardService;

    public TransferController(TransferService transferService, CardService cardService) {
        this.transferService = transferService;
        this.cardService = cardService;
    }
    @PostMapping("add")
    public ResponseEntity<Map<Object, Object>> registerTransaction(@RequestBody TransferDto requestDto) {
        Map<Object, Object> response = new HashMap<>();
        if(!cardService.checkBalance(requestDto.getCard_number_from(), requestDto.getAmount())){
            response.put("status", "balance_error");
            return ResponseEntity.ok(response);
        }
        if(cardService.findByCardNumber(requestDto.getCard_number_to()) == null){
            response.put("status", "exist_error");
            return ResponseEntity.ok(response);
        }
        Transfer transfer = new Transfer();
        transferService.register(transfer, requestDto);
        response.put("status", "ok");
        return ResponseEntity.ok(response);

    }
    @GetMapping("all/{username}/{pageNo}")
    public ResponseEntity<Map<Object, Object>> getAllTransfers(@PathVariable String username, @PathVariable String pageNo){
        Map<Object, Object> response = new HashMap<>();
        List<TransferContainer> result = transferService.findAllByUserFrom(username, Integer.parseInt(pageNo));
        response.put("transfers", result);
        return ResponseEntity.ok(response);
    }
}
