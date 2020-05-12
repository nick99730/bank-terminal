package net.proselyte.jwtappdemo.service.impl;

import lombok.extern.slf4j.Slf4j;
import net.proselyte.jwtappdemo.model.Beneficiary;
import net.proselyte.jwtappdemo.repository.BeneficiaryRepository;
import net.proselyte.jwtappdemo.service.BeneficiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class BeneficiaryServiceImpl implements BeneficiaryService {
    private final BeneficiaryRepository beneficiaryRepository;

    @Autowired
    public BeneficiaryServiceImpl(BeneficiaryRepository beneficiaryRepository) {
        this.beneficiaryRepository = beneficiaryRepository;
    }

    @Override
    public List<Beneficiary> findAll() {
        return beneficiaryRepository.findAll();
    }
}
