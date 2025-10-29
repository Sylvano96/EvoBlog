package com.example.SpringBoot.config;
import org.springframework.context.annotation.*;
import org.springframework.http.CacheControl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@Configuration
@EnableWebSecurity
public class webConfig implements WebMvcConfigurer{

    @Override
    public void addCorsMappings(CorsRegistry registry){

        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:4200")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*")
            .allowCredentials(true);

    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.csrf().disable()
            .authorizeHttpRequests( auth -> auth
                .requestMatchers("/api/**").permitAll()
                .requestMatchers("/images/**").permitAll()
                .anyRequest().authenticated()
            );
        
        return http.build();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("/images/**")
            .addResourceLocations("file:D:/L3/ProjetSpring/images/")
            .setCacheControl(CacheControl.noCache());
    }

    // @Bean
    // public PasswordEncoder passwordEncoder(){
    //     return new BCryptPasswordEncoder();
    // }
}
