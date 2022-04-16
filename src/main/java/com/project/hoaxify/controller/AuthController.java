package com.project.hoaxify.controller;

import com.project.hoaxify.dto.response.AuthResponseDto;
import com.project.hoaxify.dto.response.GenericResponse;
import com.project.hoaxify.dto.resquest.AuthRequestDto;
import com.project.hoaxify.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")

public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/auth")
	AuthResponseDto handleAuthentication(@RequestBody AuthRequestDto dto) {

		return authService.authenticate(dto);
	}

	@PostMapping("/logout")
	GenericResponse handleLogout(@RequestHeader(name = "Authorization") String authorization) {
		String token = authorization.substring(7);
		authService.clearToken(token);
		return new GenericResponse("Logout success");
	}

}
