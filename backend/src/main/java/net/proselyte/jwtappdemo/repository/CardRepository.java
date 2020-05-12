package net.proselyte.jwtappdemo.repository;

import net.proselyte.jwtappdemo.model.Card;
import net.proselyte.jwtappdemo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    Card findByCardNumber(String number);
    Optional<Card> findById(Long id);
    List<Card> findAllByCardholderUser(User user);
}
