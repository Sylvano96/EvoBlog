package com.example.SpringBoot.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SpringBoot.Entities.Comments;
import com.example.SpringBoot.Interfaces.CommentRepository;

import java.util.*;

@Service
public class MyServices {

    @Autowired
    private CommentRepository commentRepo;


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
