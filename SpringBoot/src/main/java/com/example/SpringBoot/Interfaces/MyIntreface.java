package com.example.SpringBoot.Interfaces;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SpringBoot.Entities.Users;
import com.example.SpringBoot.Entities.posts;

import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import java.util.*;

public interface MyIntreface extends JpaRepository<Users, Integer>{

    @Query(value = "SELECT * FROM users " + "WHERE email = :email"+" AND password = :password", nativeQuery = true)
    Optional<Users> loginUserOptional(@Param("email") String email, @Param("password") String password);

}
