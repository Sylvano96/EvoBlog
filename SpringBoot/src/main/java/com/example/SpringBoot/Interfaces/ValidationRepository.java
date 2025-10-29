package com.example.SpringBoot.Interfaces;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SpringBoot.Entities.Users;
import com.example.SpringBoot.Entities.Validation;
import java.util.*;


public interface ValidationRepository extends JpaRepository<Validation, Long> {

    Optional<Validation> findByCode(String code);
    Optional<Validation> findByUser(Users user);
}
