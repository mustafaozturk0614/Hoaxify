package com.project.hoaxify.annotaion;

import com.project.hoaxify.entity.User;
import com.project.hoaxify.repository.UserRepository;
import com.project.hoaxify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Optional;

public class UniqeUserNameValidator implements ConstraintValidator<UniqeUserName, String> {

	@Autowired
	UserService userService ;


	@Override
	public boolean isValid(String username, ConstraintValidatorContext context) {

		Optional<User> user=userService.findByUsername(username);
		if (user.isPresent()){
			return false;
		}
		return true;
	}
}
