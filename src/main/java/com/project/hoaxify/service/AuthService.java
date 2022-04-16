package com.project.hoaxify.service;

import com.project.hoaxify.dto.response.AuthResponseDto;
import com.project.hoaxify.dto.response.UserResponseDto;
import com.project.hoaxify.dto.resquest.AuthRequestDto;
import com.project.hoaxify.entity.Token;
import com.project.hoaxify.entity.User;
import com.project.hoaxify.error.AuthException;
import com.project.hoaxify.repository.TokenRepository;
import com.project.hoaxify.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final TokenRepository tokenRepository;
	PasswordEncoder passwordEncoder;

	public AuthService(UserRepository userRepository, TokenRepository tokenRepository,
			PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.tokenRepository = tokenRepository;
	}

	public AuthResponseDto authenticate(AuthRequestDto credentials) {
		Optional<User> inDB = userRepository.findByUsername(credentials.getUsername());
		if (inDB.isEmpty()) {
			throw new AuthException();
		}
		boolean matches = passwordEncoder.matches(credentials.getPassword(), inDB.get().getPassword());
		if (!matches) {
			throw new AuthException();
		}
		UserResponseDto userVM = new UserResponseDto(inDB.get());
		String token = generateRandomToken();

		Token tokenEntity = new Token();
		tokenEntity.setToken(token);
		tokenEntity.setUser(inDB.get());
		tokenRepository.save(tokenEntity);
		AuthResponseDto response = new AuthResponseDto();
		response.setUser(userVM);
		response.setToken(token);
		return response;
	}

	public UserDetails getUserDetails(String token) {
		Optional<Token> optionalToken = tokenRepository.findById(token);
		if (!optionalToken.isPresent()) {
			return null;
		}
		return optionalToken.get().getUser();
	}

	public String generateRandomToken() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	public void clearToken(String token) {
		tokenRepository.deleteById(token);

	}
}

