package net.proselyte.jwtappdemo.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "beneficiaries")
@Data
public class Beneficiary {
    @Id
    @GeneratedValue(
            strategy= GenerationType.AUTO
    )
    private Long id;
    @NotEmpty
    private String name;
    private String type;
    private double balance;
}
