package net.proselyte.jwtappdemo.repository;

import net.proselyte.jwtappdemo.model.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
    Optional<Beneficiary> findById(Long id);
    @Override
    List<Beneficiary> findAll();
}
