package com.project.hoaxify.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.hoaxify.annotaion.CurrentUser;
import com.project.hoaxify.dto.response.Views;
import com.project.hoaxify.entity.User;
import com.project.hoaxify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

public class AuthController {
	@Autowired
	UserService service;

	@PostMapping("api/auth")
	@JsonView(Views.Base.class)
	ResponseEntity<?> handleAuthentication(@CurrentUser User user) {

		return ResponseEntity.ok(user);
	}

}
