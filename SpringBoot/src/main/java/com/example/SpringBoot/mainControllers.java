package com.example.SpringBoot;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.SpringBoot.Entities.Users;
import com.example.SpringBoot.Entities.posts;
import com.example.SpringBoot.Entities.Login;
import com.example.SpringBoot.Entities.Comments;
import com.example.SpringBoot.Services.MyServices;
import com.example.SpringBoot.Services.UserServices;
import com.example.SpringBoot.Services.PostServices;
import com.example.SpringBoot.Services.LoginService;


import org.springframework.http.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;

@RestController
public class mainControllers {


    @Autowired
    private MyServices myServices;

    @Autowired
    private UserServices userServices;

    @Autowired
    private PostServices postServices;

    @Autowired
    private LoginService login;


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/api/create/user")
    public ResponseEntity<Users> create(@RequestBody Users user){
        Users userCreated = userServices.createUsers(user);
        return new ResponseEntity<>(userCreated, HttpStatus.CREATED);
    }

    @PostMapping("/api/activation")
    public ResponseEntity<String> activation(@RequestBody String activation){
        String x = userServices.activation(activation);
        return new ResponseEntity<>(x, HttpStatus.CREATED);
    }

    @PostMapping("/api/create/post")
    public ResponseEntity<posts> postMethodName(@RequestBody posts post) {
        posts postCreated = postServices.createPost(post);
        return new ResponseEntity<>(postCreated, HttpStatus.CREATED);
    }

    private String uploadDir = "D:/L3/ProjetSpring/images/";

    @PostMapping("/api/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            File directory = new File(uploadDir);
            if(!directory.exists()){
                directory.mkdirs();
            }
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.write(filePath, file.getBytes());

            return new ResponseEntity<>("Fichier uploadé avec succés", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de l'upload du fichier", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /************************************** POSTS***************************************** */

    @GetMapping("/api/allPosts")
    public List<posts> getPosts(){
        return postServices.getAllPosts();
    } 

    @GetMapping("/api/{id}/post")
    public posts getPostById(@PathVariable Long id){
        return postServices.getOnePost(id).orElseThrow(()-> new RuntimeException("Post non trouvé"));
    }  

    @GetMapping("/api/{value}/searchPosts")
    public List<posts> searchPosts(@PathVariable String value){
        return postServices.getSearchPosts(value);
    }  

    @PutMapping("/api/{id}/update")
    public ResponseEntity <posts> updatePost(@RequestBody posts post, @PathVariable Long id){
        posts x = postServices.updatePost(post,id);
        return new ResponseEntity<>(x, HttpStatus.OK); 
    }

    @DeleteMapping("/api/{id}/deletePost")
    public ResponseEntity <String> deletePost(@PathVariable Long id){
        if(postServices.deletePost(id)){
            return new ResponseEntity<>("Post supprimé avec succés", HttpStatus.OK); 
        }else{
            return new ResponseEntity<>("Post non trouvé", HttpStatus.NOT_FOUND); 
        }
    }

    @GetMapping("/api/{id}/userPosts")
    public List<Object[]> userPostsCount(@PathVariable Integer id){
        return postServices.postsUserCount(id);
    }

    @GetMapping("/api/allPostsForUsers")
    public List<Object[]> getAllPostsForUsers(){
        return userServices.getAllPosts();
    } 


    @GetMapping("/api/allPostsWithComments")
    public List<Object[]> getAllPostsWithComments(){
        return postServices.gestAllPostsWithComment();
    } 

    /***************************************** USERS ***************************************************/

    @GetMapping("/api/allUsers")
    public List<Users> getUsers(){
        return userServices.getAllUsers();
    } 

    @GetMapping("/api/{id}/UserPosts")
    public List <posts> getUserPosts(@PathVariable Integer id){
        return postServices.getUserPosts(id);
    } 

    @GetMapping("/api/{id}/user")
    public Users getUserById(@PathVariable Integer id){
        return userServices.getUser(id).orElseThrow(()-> new RuntimeException("Utilisateur non trouvé"));
    } 


    @DeleteMapping("/api/{id}/deleteUser")
    public ResponseEntity <String> deleteUser(@PathVariable Integer id){
        if(userServices.deleteUser(id)){
            return new ResponseEntity<>("Auteur supprimé avec succés", HttpStatus.OK); 
        }else{
            return new ResponseEntity<>("Auteur non trouvé", HttpStatus.NOT_FOUND); 
        }
    }
    /****************************  LOGIN   ***********************************/
    @PostMapping("/api/login")
    public ResponseEntity<String[]> loginUser (@RequestBody Login user){
        return new ResponseEntity<>(login.login(user), HttpStatus.OK); 
    }

    /******************************* COMMENTAIRE ***************************** */

    @PostMapping("/api/comment")
    public ResponseEntity<Comments> create(@RequestBody Comments comment){
        Comments commentCreate = myServices.createComment(comment);
        return new ResponseEntity<>(commentCreate, HttpStatus.CREATED);
    }

    @GetMapping("/api/getComments")
    public List<Comments> getAllComments(){
        return myServices.getComments();
    } 

    @DeleteMapping("/api/{id}/deleteComment")
    public ResponseEntity <String> deleteComment(@PathVariable Integer id){
        if(myServices.deleteComment(id)){
            return new ResponseEntity<>("Commentaire supprimé avec succés", HttpStatus.OK); 
        }else{
            return new ResponseEntity<>("Commentaire non trouvé", HttpStatus.NOT_FOUND); 
        }
    }

    @GetMapping("/api/data/published-by-category")
    public List<Object[]> getPublishedPostsCount(){
        return postServices.getPublishedPostsCountByCategoryLastMonth();
    } 

    @GetMapping("/api/data/published-by-allCategory")
    public List<Object[]> getPublishedPostsCountCategory(){
        return postServices.getPublishedPostsCountByCategory();
    } 

    @GetMapping("/api/data/userPosts")
    public List<Object[]> userPosts(){
        return postServices.postsUsers();
    }
}
