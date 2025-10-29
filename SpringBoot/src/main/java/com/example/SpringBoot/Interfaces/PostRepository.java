package com.example.SpringBoot.Interfaces;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import com.example.SpringBoot.Entities.posts;
@Repository
public interface PostRepository extends JpaRepository<posts, Long> {

    // @Query("SELECT * FROM posts ORDER BY created_at ASC")
    // List<posts> findAllByOrderByCreatedAtAsc();

    // @Query("SELECT * FROM posts ORDER BY created_at DESC")
    List<posts> findAllByOrderByCreatedAtDesc();

    @Query("SELECT image FROM posts")
    List<String> findAllImages();

    Optional<List<posts>> findByUserId(Integer userId);

    @Query("SELECT p.category, COUNT(p) FROM posts p " + 
    "WHERE p.status = 'publié' "+
    "AND p.createdAt BETWEEN :startDate AND :endDate "+
    "GROUP BY p.category")
    List <Object[]> countPublishedPostsByCategoryLastMonth(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
    
    @Query("SELECT p.category, COUNT(p) FROM posts p "+
    "WHERE p.status = 'publié' "+
    "GROUP BY p.category")
    List <Object[]> countPublishedPostsByCategory();


    @Query(value = "SELECT users.id, users.name, users.last_name, users.email, COUNT(posts), MAX(created_at) FROM posts "+
    "FULL OUTER JOIN users  ON users.id = posts.user_id WHERE users.status = 'redacteur' " + "GROUP BY posts.user_id,users.id", nativeQuery = true)
    List <Object[]> findUsersPostsCountsList();

    @Query(value = "SELECT * FROM posts "+"WHERE user_id=:id", nativeQuery = true)
    List <posts> findUserPosts(@Param("id") Integer id);

    @Query(value = "SELECT * FROM posts "+
    "WHERE title LIKE '%:value%' OR "+
        "category LIKE '%:value%' OR "+
        "status LIKE '%:value%'", nativeQuery=true)
    List <posts> searchPost(@Param("value") String value);   
    
    @Query(value="SELECT p.category, COUNT(p) FROM posts p "+
        "WHERE p.user_id=:id" , nativeQuery=true)
    List <Object[]> findUserPostsCount(@Param("id") Integer id);

    @Query(value="SELECT posts.category,posts.image,posts.status, posts.title, posts.contents,posts.created_at, users.name, users.last_name  FROM posts "+"FULL OUTER JOIN users ON users.id = posts.user_id "+
     "WHERE posts.status='publié' ORDER BY posts.created_at DESC", nativeQuery=true)
    List <Object[]> findPosts();
}
