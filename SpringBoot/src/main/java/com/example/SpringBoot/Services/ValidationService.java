package com.example.SpringBoot.Services;


import org.springframework.stereotype.Service;

import com.example.SpringBoot.Entities.Validation;
import com.example.SpringBoot.Interfaces.ValidationRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class ValidationService {

    private ValidationRepository validationRepository;

    // public Users saveValidation (Users user){
    //     Validation validation = new Validation();

    //     Instant creation = Instant.now();
    //     validation.setCreation(creation);

    //     Instant expiration = creation.plus(Duration.ofMinutes(10)); 
    //     validation.setExpiration(expiration);

    //     Random random = new Random();

    //     Integer randomInt = random.nextInt(999999);

    //     String code = String.format("%06d", randomInt);

    //     validation.setUser(user);

    //     validation.setCode(code);

    //     validationRepository.save(validation);

    //     // notificationService.send(validation);

    //     return validation.getUser();
    // }

    public Validation lireEnFonctionDuCode(String code){
       return  validationRepository.findByCode(code).orElseThrow(()-> new RuntimeException("Votre code est invalide"));
    }

}
