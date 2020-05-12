package net.proselyte.jwtappdemo.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Date;

@Data
public class RegistrationRequestDto {
    @NotBlank
    @Size(min = 2, max = 40)
    private String firstName;
    @NotBlank
    @Size(min = 2, max = 40)
    private String lastName;
    @NotBlank
    private String password;
    @NotBlank
    @Size(max = 40)
    @Email
    private String email;
    @NotBlank
    @Size(min = 3, max = 15)
    private String username;
    @NotBlank
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dateOfBirth;
}
