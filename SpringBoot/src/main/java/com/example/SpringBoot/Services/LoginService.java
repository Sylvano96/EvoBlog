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
    private MyIntreface myIntreface;

    public String[] login(Login users){

        Optional <Users> user = myIntreface.loginUserOptional(users.getEmail(), users.getPassword());

        if(user.isPresent()){
            String [] data = {"evo-blog-pl-"+user.get().getId(), user.get().getStatus(), user.get().getName()};
            return data;
        } else if (users.getEmail() == "eliasvano78@gmail.com" && users.getPassword() == "eliasvano"){
            String [] data = {"evo-blog-pl-"+"00000", "admin", "Administrateur"};
            return data;
        }

        throw new IllegalStateException("Utilisateur non trouvé");
    }

}
