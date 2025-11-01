package com.example.SpringBoot.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SpringBoot.Entities.posts;
import com.example.SpringBoot.Interfaces.PostRepository;
import com.example.SpringBoot.Interfaces.CommentRepository;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class PostServices {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    private String uploadDir = "D:/L3/ProjetSpring/images/";

    // ------------------------ CREATE POST ------------------------
    public posts createPost(posts post) {
        try {
            String originalName = post.getImage();

            if (originalName != null && !originalName.isEmpty()) {
                // Sécuriser le nom de fichier
                String safeName = originalName.trim()
                        .replaceAll("\\s+", "_")                     // remplacer espaces par _
                        .replaceAll("[^a-zA-Z0-9._-]", "");         // retirer caractères spéciaux

                String newFileName = UUID.randomUUID().toString() + "_" + safeName;

                Path oldPath = Paths.get(uploadDir).resolve(originalName);
                Path newPath = Paths.get(uploadDir).resolve(newFileName);

                if (Files.exists(oldPath)) {
                    Files.move(oldPath, newPath);
                    System.out.println("Fichier déplacé : " + newPath);
                } else {
                    System.err.println("Fichier non trouvé : " + oldPath);
                }

                post.setImage(newFileName);
            }

            postRepository.save(post);

        } catch (Exception e) {
            System.err.println("Erreur lors de la création du post : " + e);
        }

        return post;
    }

    // ------------------------ GET POSTS ------------------------
    public List<posts> getUserPosts(Integer id) {
        return postRepository.findUserPosts(id);
    }

    public List<posts> getSearchPosts(String value) {
        return postRepository.searchPost(value);
    }

    public List<posts> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public List <Object[]> gestAllPostsWithComment(){
        return postRepository.getAllPostsWithComments();
    }

    public Optional<posts> getOnePost(Long id) {
        return postRepository.findById(id);
    }

    // ------------------------ UPDATE POST ------------------------
    public posts updatePost(posts updatePost, Long id) {
        return postRepository.findById(id).map(post -> {
            post.setTitle(updatePost.getTitle());
            post.setContents(updatePost.getContents());
            post.setStatus(updatePost.getStatus());
            post.setCategory(updatePost.getCategory());

            try {
                String newImageName = updatePost.getImage();
                if (newImageName != null && !newImageName.isEmpty() && !newImageName.equals(post.getImage())) {
                    // Supprimer ancien fichier si existe
                    Path oldFilePath = Paths.get(uploadDir).resolve(post.getImage());
                    if (Files.exists(oldFilePath)) {
                        Files.delete(oldFilePath);
                        System.out.println("Ancien fichier supprimé : " + oldFilePath);
                    }

                    // Déplacer nouveau fichier
                    String safeName = newImageName.trim()
                            .replaceAll("\\s+", "_")
                            .replaceAll("[^a-zA-Z0-9._-]", "");
                    String finalFileName = UUID.randomUUID().toString() + "_" + safeName;
                    Path newFilePath = Paths.get(uploadDir).resolve(finalFileName);

                    Path tempPath = Paths.get(uploadDir).resolve(newImageName);
                    if (Files.exists(tempPath)) {
                        Files.move(tempPath, newFilePath);
                        System.out.println("Nouveau fichier déplacé : " + newFilePath);
                    }

                    post.setImage(finalFileName);
                }

            } catch (Exception e) {
                System.err.println("Erreur lors de la mise à jour du post : " + e);
            }

            postRepository.save(post);
            return post;
        }).orElseThrow(() -> new RuntimeException("Post non trouvé"));
    }

    // ------------------------ DELETE POST ------------------------
    public boolean deletePost(Long id) {
        return postRepository.findById(id).map(post -> {
            try {
                Path imagePath = Paths.get(uploadDir).resolve(post.getImage());
                if (Files.exists(imagePath)) {
                    Files.delete(imagePath);
                    System.out.println("Fichier supprimé : " + imagePath);
                }
            } catch (Exception e) {
                System.err.println("Erreur lors de la suppression de l'image : " + e);
            }

            postRepository.deleteById(id);
            return true;
        }).orElse(false);
    }

    // ------------------------ IMAGES ------------------------
    public List<String> getAllImages() {
        return postRepository.findAllImages();
    }

    public void cleanUpImages() {
        List<String> imageNames = getAllImages();
        File folder = new File(uploadDir);
        File[] listOfFiles = folder.listFiles();

        if (listOfFiles != null) {
            for (File file : listOfFiles) {
                if (file.isFile() && !imageNames.contains(file.getName())) {
                    file.delete();
                    System.out.println("Fichier supprimé (cleanup) : " + file.getName());
                }
            }
        }
    }

    // ------------------------ STATISTICS ------------------------
    public List<Object[]> getPublishedPostsCountByCategoryLastMonth() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -1);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        Date startDate = calendar.getTime();
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        Date endDate = calendar.getTime();

        return postRepository.countPublishedPostsByCategoryLastMonth(startDate, endDate);
    }

    public List<Object[]> getPublishedPostsCountByCategory() {
        return postRepository.countPublishedPostsByCategory();
    }

    public List<Object[]> postsUsers() {
        return postRepository.findUsersPostsCountsList();
    }

    public List<Object[]> postsUserCount(Integer id) {
        return postRepository.findUserPostsCount(id);
    }
}
