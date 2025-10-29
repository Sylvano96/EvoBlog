package com.example.SpringBoot.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SpringBoot.Entities.Users;
import com.example.SpringBoot.Entities.Validation;
import com.example.SpringBoot.Entities.posts;
import com.example.SpringBoot.Interfaces.MyIntreface;
import com.example.SpringBoot.Interfaces.PostRepository;
import com.example.SpringBoot.Interfaces.ValidationRepository;

import java.util.*;
import java.time.Duration;
import java.time.Instant;

@Service
public class UserServices {

    @Autowired
    private MyIntreface myIntreface;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ValidationRepository validationRepository;
    @Autowired
    private ValidationService validationService;
    @Autowired
    private NotificationService notificationService;

    public Users createUsers(Users user){

        /********* SAUVEGARDER L' USER ********************** */

        Users savedUser = myIntreface.save(user);

        /**************************** VALIDATION *************** */

        Validation validation = new Validation();

        Instant creation = Instant.now();
        validation.setCreation(creation);

        Instant expiration = creation.plus(Duration.ofMinutes(10)); 
        validation.setExpiration(expiration);

        Random random = new Random();

        Integer randomInt = random.nextInt(999999);

        String code = String.format("%06d", randomInt);

        validation.setUser(savedUser);

        validation.setCode(code);

        validationRepository.save(validation);

        notificationService.sendEmail(validation.getUser().getEmail(), validation.getUser().getName(), validation.getUser().getLastName(), code);
        
        return savedUser;
    }


    public List <Users> getAllUsers(){
        return myIntreface.findAll();
    }

    public Optional <Users> getUser(Integer id){
        return myIntreface.findById(id);
    }

    public boolean deleteUser(Integer id){
        if(myIntreface.existsById(id)){

            Users user = myIntreface.findById(id).orElseThrow(()-> new RuntimeException("Utilisateur n'existe pas"));

            Validation  deleteValidation = validationRepository.findByUser(user).orElseThrow(()-> new RuntimeException("L'utilisateur n'a pas de code de validation"));

            validationRepository.delete(deleteValidation);

            myIntreface.deleteById(id);
            
            Optional<List<posts>> postsUser = postRepository.findByUserId(id);

            return postsUser.map(posts -> {
                postRepository.deleteAll(posts);
                return true ;
            }).orElse(true);
            
        }else{ 
            return false;
        }
    }

    public List<Object[]> getAllPosts(){
        return postRepository.findPosts();
    }

    public String activation(String activation){
        Validation validation = validationService.lireEnFonctionDuCode(activation);
        if(Instant.now().isAfter(validation.getExpiration())) {
            return "Votre code est expiré";
        }
        Users user = myIntreface.findById(validation.getUser().getId()).orElseThrow(()-> new RuntimeException("Utilisateur n'existe pas"));

        user.setActif(true);

        myIntreface.save(user);

        return "Code validé";
    }




}
