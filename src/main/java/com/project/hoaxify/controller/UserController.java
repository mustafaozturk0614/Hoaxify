package com.project.hoaxify.controller;

import com.project.hoaxify.entity.User;
import com.project.hoaxify.error.ApiError;
import com.project.hoaxify.service.UserService;
import com.project.hoaxify.shared.GenericResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api")
public class UserController {
@Autowired
 UserService service;
	private static  final Logger log= LoggerFactory.getLogger(UserController.class);

@PostMapping("/users")

public GenericResponse creatUser(@Valid @RequestBody User user){


	service.createUser(user);
	log.info(user.toString());
	return  new GenericResponse("UserCreated");
}
@ExceptionHandler(MethodArgumentNotValidException.class)
@ResponseStatus(HttpStatus.BAD_REQUEST)
public  ApiError handleValidException(MethodArgumentNotValidException exception){
	ApiError error=new ApiError(400,"Validation Error","api/users");
	Map<String,String > validationErrors=new HashMap<>();
	for(FieldError fieldError: exception.getBindingResult().getFieldErrors()){
		validationErrors.put(fieldError.getField(),fieldError.getDefaultMessage());
	}
	error.setValidationErrors(validationErrors);
	return error;

}


}
