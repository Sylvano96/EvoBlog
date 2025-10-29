package com.example.SpringBoot.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SpringBoot.Entities.Users;
import com.example.SpringBoot.Entities.Validation;
import com.example.SpringBoot.Entities.posts;
import com.example.SpringBoot.Entities.Comments;
import com.example.SpringBoot.Interfaces.MyIntreface;
import com.example.SpringBoot.Interfaces.PostRepository;
import com.example.SpringBoot.Interfaces.CommentRepository;
import com.example.SpringBoot.Interfaces.ValidationRepository;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.*;
import java.time.Duration;
import java.time.Instant;

@Service
public class MyServices {

    @Autowired
    private MyIntreface myIntreface;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepo;
    @Autowired
    private ValidationRepository validationRepository;
    
    //-------------------------------------------------------------  USER    ------------------------------------------------------------//

    @Autowired
    private ValidationService validationService;
    @Autowired
    private NotificationService notificationService;

    /************************************************* COMMENTAIRES ***************************************** */
    public Comments createComment(Comments comment){
        Comments x = commentRepo.save(comment);
        return x;
    }

    public List<Comments> getComments(){
        return commentRepo.findAll();
    }

    public boolean deleteComment(Integer id){
        if(commentRepo.existsById(id)){
            commentRepo.deleteById(id);
            return true ;
        } else {
            return false;
        }
    }

}
