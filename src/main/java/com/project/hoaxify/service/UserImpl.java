package com.project.hoaxify.service;

import com.project.hoaxify.entity.User;
import com.project.hoaxify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserImpl  implements UserService {

	private UserRepository userRepository;

	PasswordEncoder passwordEncoder;
	@Autowired
	public UserImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}

	@Override public User createUser(User user) {
		String encrytptedPasssword=this.passwordEncoder.encode(user.getPassword());
		user.setPassword(encrytptedPasssword);
		return userRepository.save(user);
	}
}
