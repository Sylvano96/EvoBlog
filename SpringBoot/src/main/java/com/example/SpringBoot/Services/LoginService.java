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
            String [] data = {"evo-blog-pl-"+user.get().getId(), user.get().getStatus()};
            return data;
        }else{
            String [] data = {"Erreur d'email ou de mot de passe"};
            return data;
        }
    }

}
