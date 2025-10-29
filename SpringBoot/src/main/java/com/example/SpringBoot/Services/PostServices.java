package com.example.SpringBoot.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SpringBoot.Entities.Users;
import com.example.SpringBoot.Entities.posts;
import com.example.SpringBoot.Interfaces.MyIntreface;
import com.example.SpringBoot.Interfaces.PostRepository;
import com.example.SpringBoot.Interfaces.CommentRepository;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.*;
import java.time.Duration;
import java.time.Instant;

@Service
public class PostServices {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private MyIntreface myIntreface;
    
    // -------------------------------------------------------   POST   -----------------------------------------------------//

    private String newImageFileName;
    
    private String uploadDir = "D:/L3/ProjetSpring/images/";

    public posts createPost(posts post){

        try {
            String imageName = post.getImage();
            String imagePath = Paths.get(uploadDir, imageName).toString();
            System.out.println("Le file : " + imageName);

            UUID uuid = UUID.randomUUID();

            String uuidStr = uuid.toString();

            newImageFileName = uuidStr+imageName;
            File imageFile = new File(imagePath);
            System.out.println("Le file ato raha misy : " + imageFile);

            if (imageFile.exists()){
                Path lastFilePath = Paths.get(uploadDir + imageName);
                Path newFilePath = Paths.get(uploadDir + newImageFileName);
                System.out.println("L'ancien file : " + lastFilePath);
                System.out.println("Nouveau file : " + newFilePath);
                Files.move(lastFilePath, newFilePath);
            }   
            post.setImage(newImageFileName);
            postRepository.save(post);
        } catch (Exception e) {
            System.err.println("Erreur : "+ e);
        }
        return post;

    }

    public List<posts> getUserPosts(Integer id){
        return postRepository.findUserPosts(id);
    }

    public List<posts> getSearchPosts(String value){
        return postRepository.searchPost(value);
    }

    public List<posts> getAllPosts(){
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<posts> getOnePost(Long id){
        return postRepository.findById(id);
    }

    private String lastImage;
    private String newImage;

    public posts updatePost(posts updatePost, Long id){

        posts x = postRepository.findById(id).map(post -> {
            post.setTitle(updatePost.getTitle());
            post.setContents(updatePost.getContents());
            post.setStatus(updatePost.getStatus());
            post.setCategory(updatePost.getCategory());

            System.out.println("L'ancien :"+post.getImage());
            System.out.println("La nouvelle :"+updatePost.getImage());

            try {

                lastImage = post.getImage();
                newImage = updatePost.getImage();

                if(post.getImage() == updatePost.getImage()){
                    String imageName = post.getImage();
                    String imagePath = Paths.get(uploadDir, imageName).toString();
                    File imageFile = new File(imagePath);
                    if (imageFile.exists()){
                        imageFile.delete();
                    }
                }

                post.setImage(updatePost.getImage());
                postRepository.save(post);

              
            } catch (Exception e) {
                System.err.println("Erreur : "+ e);
            }

            cleanUpImages();

            return updatePost;
        }
        ).orElseThrow(()-> new RuntimeException("Post non trouvé"));

        if(lastImage == newImage){
            System.out.println("Identique");
        }else{
            System.out.println("Différente");
        }

        return x;
        
    }

    public boolean deletePost(Long id){
        if(postRepository.existsById(id)){
            Optional <String>  post = postRepository.findById(id).map(posts::getImage);
            String imageName = post.orElse("Post non trouvé");
            String imagePath = Paths.get("D:/L3/ProjetSpring/images/", imageName).toString();

            File imageFile = new File(imagePath);

            // Comments com =  commentRepo.findByPostId(id).orElseThrow(()-> new RuntimeException("Commentaires introuvables"));

            // commentRepo.delete(com);

            if (imageFile.exists()){
                imageFile.delete();
            }
            postRepository.deleteById(id);
            return true ;
        } else {
            return false;
        }
    }
    
    /************************************** IMAGES ************************************** */

    public List <String> getAllImages(){
        return postRepository.findAllImages();
    } 

    public void cleanUpImages(){
        List <String> imageName = getAllImages();

        File folder = new File("D:/L3/ProjetSpring/images/");
        File [] listOfFiles = folder.listFiles();
        
        if(listOfFiles != null){
            for (File file : listOfFiles){
                if(file.isFile()){
                    String fileName = file.getName();
                    if(!imageName.contains(fileName)){
                        file.delete();
                        System.out.println("Deleted : "+fileName);
                    }
                }
            }
        }
    }

    
    public List<Object[]> getPublishedPostsCountByCategoryLastMonth(){
        Calendar calendar = Calendar.getInstance();

        calendar.add(Calendar.MONTH, -1);
        calendar.set(Calendar.DAY_OF_MONTH, 1);

        Date startDate = calendar.getTime();

        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));

        Date endDate= calendar.getTime();

        return postRepository.countPublishedPostsByCategoryLastMonth(startDate, endDate);

    }

    public List<Object[]> getPublishedPostsCountByCategory(){

        return postRepository.countPublishedPostsByCategory();

    }

    public List<Object[]> postsUsers(){
        return postRepository.findUsersPostsCountsList();
    }

    public List<Object[]> postsUserCount(Integer id){
        return postRepository.findUserPostsCount(id);
    }

}
