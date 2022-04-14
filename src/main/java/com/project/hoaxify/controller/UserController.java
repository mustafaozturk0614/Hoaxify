package com.project.hoaxify.controller;

import com.project.hoaxify.annotaion.CurrentUser;
import com.project.hoaxify.dto.response.GenericResponse;
import com.project.hoaxify.dto.response.UserResponseDto;
import com.project.hoaxify.dto.resquest.UserUpdateRequestDto;
import com.project.hoaxify.entity.User;
import com.project.hoaxify.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class UserController {
	private final UserService service;
	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	public UserController(UserService service) {
		this.service = service;
	}

	@PostMapping("/users")

	public GenericResponse creatUser(@Valid @RequestBody User user) {

		service.createUser(user);
		log.info(user.toString());
		return new GenericResponse("UserCreated");
	}

	@GetMapping("/users")

	public Page<UserResponseDto> getUsers(Pageable page, @CurrentUser User user) {
		return service.findAll(page, user).map(UserResponseDto::new);
	}

	@GetMapping("/users/{username}")

	public UserResponseDto getUser(@PathVariable String username) {
		Optional<User> user = service.getByUsername(username);
		return new UserResponseDto(user.get());
	}

	@PutMapping("/users/{username}")
	@PreAuthorize("#username==principal.username")

	public UserResponseDto updateUser(@Valid @RequestBody UserUpdateRequestDto updatedUser,
			@PathVariable String username) {

		User user = service.updateUser(username, updatedUser);

		return new UserResponseDto(user);
	}

	@DeleteMapping("/users/{username}")
	@PreAuthorize("#username==principal.username")
	GenericResponse deleteUser(@PathVariable String username) {
		service.deleteUser(username);
		return new GenericResponse("User is removed");
	}

	//
	// @ExceptionHandler(MethodArgumentNotValidException.class)
	//@ResponseStatus(HttpStatus.BAD_REQUEST)
	//public  ApiError handleValidException(MethodArgumentNotValidException exception){
	//	ApiError error=new ApiError(400,"Validation Error","api/users");
	//	Map<String,String > validationErrors=new HashMap<>();
	//	for(FieldError fieldError: exception.getBindingResult().getFieldErrors()){
	//		validationErrors.put(fieldError.getField(),fieldError.getDefaultMessage());
	//	}
	//	error.setValidationErrors(validationErrors);
	//	return error;
	//
	//}

}
