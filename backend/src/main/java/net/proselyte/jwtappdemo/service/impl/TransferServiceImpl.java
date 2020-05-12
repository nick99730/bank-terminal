package net.proselyte.jwtappdemo.service.impl;

import lombok.extern.slf4j.Slf4j;
import net.proselyte.jwtappdemo.dto.TransferDto;
import net.proselyte.jwtappdemo.model.Card;
import net.proselyte.jwtappdemo.model.Transfer;
import net.proselyte.jwtappdemo.model.User;
import net.proselyte.jwtappdemo.repository.CardRepository;
import net.proselyte.jwtappdemo.repository.TransferRepository;
import net.proselyte.jwtappdemo.repository.UserRepository;
import net.proselyte.jwtappdemo.service.TransferContainer;
import net.proselyte.jwtappdemo.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class TransferServiceImpl implements TransferService {
    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final TransferRepository transferRepository;
   
    @Autowired
    public TransferServiceImpl(CardRepository cardRepository,
                               UserRepository userRepository,
                               TransferRepository transferRepository) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
        this.transferRepository = transferRepository;
    }

    @Override
    public Transfer register(Transfer transfer, TransferDto transferDto) {
        Card toCard = cardRepository.findByCardNumber(transferDto.getCard_number_to());
        Card fromCard = cardRepository.findByCardNumber(transferDto.getCard_number_from());
        toCard.setBalance(toCard.getBalance()+transferDto.getAmount());
        fromCard.setBalance(fromCard.getBalance()-transferDto.getAmount());
        User from_user = fromCard.getCardholderUser();
        User to_user = toCard.getCardholderUser();
        transfer.setAmount(transferDto.getAmount());
        transfer.setFrom(from_user);
        transfer.setFromCard(fromCard);
        transfer.setToCard(toCard);
        transfer.setDetails("Transfer to " + toCard.getCardNumber());
        transfer.setTo(to_user);
        transfer.setCreatedDate(new Date());
        return transferRepository.save(transfer);
    }

    @Override
    public List<TransferContainer> findAllByUserFrom(String username, int page) {
        Pageable paging = PageRequest.of(page, 3, Sort.by("createdDate").descending());
        User user_from = userRepository.findByUsername(username);
        List<Transfer> transfers = transferRepository.findAllByFrom(user_from, paging);
        ArrayList<TransferContainer> transferContainers = new ArrayList<>();
        for (Transfer transfer:transfers) {
            transferContainers.add(new TransferContainer(transfer.getId(),
                    transfer.getFromCard().getCardNumber(),
                    transfer.getToCard().getCardNumber(),
                    transfer.getAmount(),
                    transfer.getCreatedDate(),
                    transfer.getTo().getUsername(),
                    transfer.getFrom().getUsername(),
                    transfer.getDetails()));
        }
        return transferContainers;
    }
}
