package net.proselyte.jwtappdemo.rest;

import net.proselyte.jwtappdemo.dto.TransactionDto;
import net.proselyte.jwtappdemo.model.Transaction;
import net.proselyte.jwtappdemo.service.TransactionContainer;
import net.proselyte.jwtappdemo.service.TransactionService;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping(value = "/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/add")
    public ResponseEntity<Map<Object, Object>> registerTransaction(@RequestBody TransactionDto requestDto) {
        Map<Object, Object> response = new HashMap<>();
        if(!transactionService.checkBalance(requestDto.getCardNumber(), requestDto.getAmount())){
            response.put("status", "error");
            return ResponseEntity.ok(response);
        }
        Transaction transaction = new Transaction();
        transactionService.register(transaction, requestDto);
        response.put("status", "ok");
        return ResponseEntity.ok(response);
    }
    @GetMapping("all/{username}/{pageNo}")
    public ResponseEntity<Map<Object, Object>> getAllTransactions(@PathVariable String username, @PathVariable String pageNo){
        Map<Object, Object> response = new HashMap<>();
        List<TransactionContainer> result = transactionService.findAllByUsername(username, Integer.parseInt(pageNo));
        response.put("transactions", result);
        return ResponseEntity.ok(response);
    }
}
