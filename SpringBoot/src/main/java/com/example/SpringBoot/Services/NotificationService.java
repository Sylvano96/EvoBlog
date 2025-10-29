package com.example.SpringBoot.Services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.*;

import org.springframework.beans.factory.annotation.Autowired;

@AllArgsConstructor
@Service
public class NotificationService {

    @Autowired
    private JavaMailSender javaMailSender;
    
    public void sendEmail(String dest, String name, String lastName, String code){

        if(javaMailSender == null){
            throw new IllegalStateException("Java mail sender n'est pas injecté");
        }
    
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("eliasvano78@gmail.com");
        mailMessage.setTo(dest);
        mailMessage.setSubject("Votre code d'activation, chez Evo-blog");

        String text = String.format("Bonjour %s %s </br> Votre code d'activation est : %s .", 
        name, lastName, code);
        
        mailMessage.setText(text);

        javaMailSender.send(mailMessage);
    }
}   
