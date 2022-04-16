package com.project.hoaxify.repository;

import com.project.hoaxify.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, String> {
}
