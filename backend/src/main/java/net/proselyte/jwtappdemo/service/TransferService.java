package net.proselyte.jwtappdemo.service;

import net.proselyte.jwtappdemo.dto.TransferDto;
import net.proselyte.jwtappdemo.model.Card;
import net.proselyte.jwtappdemo.model.Transfer;

import java.util.List;

public interface TransferService {
    Transfer register(Transfer transfer, TransferDto transferDto);
    List<TransferContainer> findAllByUserFrom(String username, int page);
}
