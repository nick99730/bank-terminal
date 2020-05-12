package net.proselyte.jwtappdemo.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TransactionDto {
    @Size(min = 16,max = 16)
    private String cardNumber;
    @NotBlank
    private Long beneficiaryId;
    @Size(min = 3,max = 3)
    @NotBlank
    private double amount;
    @NotBlank
    private String details;
}
