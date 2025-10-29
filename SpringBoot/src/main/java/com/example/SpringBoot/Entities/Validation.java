package com.example.SpringBoot.Entities;

import java.time.Instant;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="validation")
public class Validation {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private Instant creation;

    private Instant expiration;

    private String code;

    @OneToOne(cascade = CascadeType.ALL)
    private Users user;
} 
