package com.project.hoaxify.annotaion;

import com.project.hoaxify.entity.User;
import com.project.hoaxify.repository.UserRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Optional;

public class UniqeUserNameValidator implements ConstraintValidator<UniqeUserName, String> {

	final UserRepository userRepository;

	public UniqeUserNameValidator(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public boolean isValid(String username, ConstraintValidatorContext context) {

		Optional<User> user = userRepository.findByUsername(username);
		if (user.isPresent()) {
			return false;
		}
		return true;
	}
}
