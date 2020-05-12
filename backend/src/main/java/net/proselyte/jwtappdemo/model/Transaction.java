package net.proselyte.jwtappdemo.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Entity
@Table(name = "transactions")
@Getter
@Setter
public class Transaction {
    @Id
    @GeneratedValue(
            strategy= GenerationType.AUTO
    )
    private Long id;
    @ManyToOne
    @JoinColumn(name = "from_user_id", nullable = false)
    private User from;
    @ManyToOne
    @JoinColumn(name = "beneficiary_id", nullable = false)
    private Beneficiary to;
    private double amount;
    @ManyToOne
    @JoinColumn(name = "from_card_id", nullable = false)
    private Card card;
    @NotEmpty
    private String details;
    @Column(name="createdDate")
    private Date createdDate;
}
