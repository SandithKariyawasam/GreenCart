package com.example.Greencart.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("GreenCart E-Commerce API")
                        .version("1.0")
                        .description("Full documentation for GreenCart Backend")
                        .contact(new Contact()
                                .name("Admin")
                                .email("admin@greencart.com")));
    }
}