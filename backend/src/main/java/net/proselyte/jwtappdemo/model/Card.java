package net.proselyte.jwtappdemo.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

@Entity
@Table(name = "cards")
@Getter
@Setter
public class Card {
    @Id
    @GeneratedValue(
            strategy= GenerationType.AUTO
    )
    private Long id;
    @NotEmpty
    private String cardNumber;
    private LocalDate expiry;
    @NotEmpty
    private String cardholderName;
    private int cvc;
    private double balance;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User cardholderUser;
}
