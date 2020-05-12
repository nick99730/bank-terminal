package net.proselyte.jwtappdemo.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.validation.constraints.Size;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TransferDto {
    @Size(min = 16, max = 16)
    private String card_number_to;
    @Size(min = 16, max = 16)
    private String card_number_from;
    private double amount;
}
