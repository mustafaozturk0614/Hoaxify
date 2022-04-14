package com.project.hoaxify.controller;

import com.project.hoaxify.dto.response.AuthResponseDto;
import com.project.hoaxify.dto.resquest.AuthRequestDto;
import com.project.hoaxify.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("api/auth")
	AuthResponseDto handleAuthentication(@RequestBody AuthRequestDto dto) {

		return authService.authenticate(dto);
	}

}
