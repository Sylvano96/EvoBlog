package com.example.SpringBoot.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SpringBoot.Entities.Login;
import com.example.SpringBoot.Entities.Users;
import com.example.SpringBoot.Interfaces.MyIntreface;


@Service
public class LoginService {

    @Autowired
    private MyIntreface myInterface;

    public String[] login(Login users) {

        Optional<Users> user = myInterface.loginUserOptional(users.getEmail(), users.getPassword());

        // Vérifie d'abord si l'utilisateur existe
        if (!user.isPresent()) {
            throw new IllegalStateException("Utilisateur non trouvé");
        }

        // Ensuite vérifie s'il est actif
        if (!user.get().isActif()) {
            throw new IllegalStateException("Utilisateur inactif");
        }

        // Récupère les données de l'utilisateur
        Users foundUser = user.get();
        String[] data = {
            "evo-blog-pl-" + foundUser.getId(),
            String.valueOf(foundUser.getStatus()),
            foundUser.getName() + " " + foundUser.getLastName()
        };

        return data;
    }

}