package net.proselyte.jwtappdemo.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Entity
@Table(name = "transfers")
@Getter
@Setter
public class Transfer {
    @Id
    @GeneratedValue(
            strategy= GenerationType.AUTO
    )
    private Long id;
    @ManyToOne
    @JoinColumn(name = "from_user_id", nullable = false)
    private User from;
    @ManyToOne
    @JoinColumn(name = "to_user_id", nullable = false)
    private User to;
    @ManyToOne
    @JoinColumn(name = "from_card_id", nullable = false)
    private Card fromCard;
    @ManyToOne
    @JoinColumn(name = "to_card_id", nullable = false)
    private Card toCard;
    @NotEmpty
    private String details;
    private double amount;
    @Column(name="createdDate")
    private Date createdDate;
}
