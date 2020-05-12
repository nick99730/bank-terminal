package net.proselyte.jwtappdemo.rest;


import net.proselyte.jwtappdemo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping(value = "/users")

public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get_user_info/{username}")
    public ResponseEntity<Map<Object, Object>> getUserInfo(@PathVariable String username){
        Map<Object, Object> response = new HashMap<>();
        response.put("user_info", userService.findByUsername(username));
        return ResponseEntity.ok(response);
    }
}
