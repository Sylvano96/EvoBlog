package com.example.SpringBoot.Entities;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;



@Entity
@Table(name="posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class posts {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Integer userId;

    private String image;

    private String category;

    private String status;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition="jsonb")
    private List <Map<String, Object>> contents;

    @CreationTimestamp
    @Column(name="created_at")
    private Date createdAt;

}
