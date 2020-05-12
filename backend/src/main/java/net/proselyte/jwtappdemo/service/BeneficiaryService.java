package net.proselyte.jwtappdemo.service;

import net.proselyte.jwtappdemo.model.Beneficiary;

import java.util.List;

public interface BeneficiaryService {
    List<Beneficiary> findAll();
}
