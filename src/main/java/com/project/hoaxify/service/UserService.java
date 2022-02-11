package com.project.hoaxify.service;

import com.project.hoaxify.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService  {

	  User createUser(User user);
	Optional<User> findByUsername(String name);
	  boolean encoding(String code);
	  List<User> findAll();
}
