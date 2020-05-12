package net.proselyte.jwtappdemo.rest;

import net.proselyte.jwtappdemo.dto.RegistrationRequestDto;
import net.proselyte.jwtappdemo.model.User;
import net.proselyte.jwtappdemo.repository.RoleRepository;
import net.proselyte.jwtappdemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping(value = "/sign_up")
public class RegistrationRestController {
    private final UserService userService;
    @Autowired
    RoleRepository roleRepository;
    public RegistrationRestController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping
    public ResponseEntity<Map<Object, Object>> registerUser(@RequestBody RegistrationRequestDto requestDto) {
        Map<Object, Object> response = new HashMap<>();
        response.put("username_error","false");
        response.put("email_error","false");
        boolean usernameError = userService.existsByUsername(requestDto.getUsername());
        boolean emailError = userService.existsByEmail(requestDto.getEmail());
        if(usernameError) {
            response.put("status", "error");
            response.put("username_error","true");
        }
        if(emailError) {
            response.put("status", "error");
            response.put("email_error","true");
        }
        if(emailError || usernameError) return ResponseEntity.ok(response);
        User user = new User();
        userService.register(user, requestDto);
        response.put("status", "ok");
        return ResponseEntity.ok(response);
    }
}
