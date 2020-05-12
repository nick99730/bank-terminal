package net.proselyte.jwtappdemo.repository;

import net.proselyte.jwtappdemo.model.Card;
import net.proselyte.jwtappdemo.model.Transaction;
import net.proselyte.jwtappdemo.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByFrom(User user, Pageable pageable);
    List<Transaction> findAllByCard(Card card);
}
