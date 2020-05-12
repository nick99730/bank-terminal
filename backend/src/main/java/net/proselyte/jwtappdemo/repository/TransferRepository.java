package net.proselyte.jwtappdemo.repository;

import net.proselyte.jwtappdemo.model.Card;
import net.proselyte.jwtappdemo.model.Transfer;
import net.proselyte.jwtappdemo.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransferRepository extends JpaRepository<Transfer, Long> {
    Transfer findByFrom(User user);
    List<Transfer> findAllByToCard(Card card);
    List<Transfer> findAllByFromCard(Card card);
    List<Transfer> findAllByFrom(User user, Pageable pageable);
}
