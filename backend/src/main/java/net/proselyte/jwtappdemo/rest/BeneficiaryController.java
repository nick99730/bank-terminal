package net.proselyte.jwtappdemo.rest;
import net.proselyte.jwtappdemo.service.BeneficiaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping(value = "/beneficiaries")
public class BeneficiaryController {
    private BeneficiaryService beneficiaryService;
    public BeneficiaryController(BeneficiaryService beneficiaryService) {
        this.beneficiaryService = beneficiaryService;
    }
    @GetMapping("/all")
    public ResponseEntity<Map<Object, Object>> getCardInfo(){
        Map<Object, Object> response = new HashMap<>();
        response.put("beneficiaries", beneficiaryService.findAll());
        return ResponseEntity.ok(response);
    }
}
