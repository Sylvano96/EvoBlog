package com.example.SpringBoot.Interfaces;
import com.example.SpringBoot.Entities.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
import java.util.List;


public interface CommentRepository extends JpaRepository<Comments, Integer>{
    // Optional<Comments> findByPostId(Long postId);
}
