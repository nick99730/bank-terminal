package net.proselyte.jwtappdemo.service;

import net.proselyte.jwtappdemo.dto.RegistrationRequestDto;
import net.proselyte.jwtappdemo.model.User;

import java.util.List;

public interface UserService {

    User register(User user, RegistrationRequestDto requestDto);

    List<User> getAll();

    User findByUsername(String username);

    User findById(Long id);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    void delete(Long id);
}
