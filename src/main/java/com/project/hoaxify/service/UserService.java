package com.project.hoaxify.service;

import com.project.hoaxify.dto.resquest.UserUpdateRequestDto;
import com.project.hoaxify.entity.User;
import com.project.hoaxify.error.NotFoundException;
import com.project.hoaxify.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final FileService fileService;

	PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, FileService fileService, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.fileService = fileService;
		this.passwordEncoder = passwordEncoder;

	}

	public User createUser(User user) {
		String encrytptedPasssword = this.passwordEncoder.encode(user.getPassword());
		user.setPassword(encrytptedPasssword);
		return userRepository.save(user);
	}

	public Optional<User> findByUsername(String name) {
		return userRepository.findByUsername(name);
	}

	public boolean encoding(String code) {
		String base64encoded = code.split("Basic ")[1];
		String decoded = new String(Base64.getDecoder().decode(base64encoded));
		String parts[] = decoded.split(":");
		Optional<User> user = userRepository.findByUsername(parts[0]);
		if (user.isEmpty()) {

			return false;

		} else {
			String hasPassword = user.get().getPassword();
			if (passwordEncoder.matches(parts[1], hasPassword)) {
				return true;

			} else {
				return false;
			}
		}

	}

	public Page<User> findAll(Pageable page, User user) {
		if (user != null) {
			return userRepository.findByUsernameNot(user.getUsername(), page);
		}
		return userRepository.findAll(page);
	}

	public Optional<User> getByUsername(String username) {
		Optional<User> userindb = userRepository.findByUsername(username);

		if (userindb.isEmpty()) {
			throw new NotFoundException();

		}
		return userindb;

	}

	public User updateUser(String username, UserUpdateRequestDto updatedUser) {
		Optional<User> userInDb = getByUsername(username);
		userInDb.get().setDisplayName(updatedUser.getDisplayName());
		if (updatedUser.getImage() != null) {
			String oldImageName = userInDb.get().getImage();
			try {
				String storageFileName = fileService.writeBase64EncodedStringToFile(updatedUser.getImage());
				userInDb.get().setImage(storageFileName);
			} catch (IOException e) {
				e.printStackTrace();
			}
			fileService.deleteProfileimage(oldImageName);
		}
		return userRepository.save(userInDb.get());

	}

	public void deleteUser(String username) {
		Optional<User> inDB = userRepository.findByUsername(username);

		fileService.deleteAllStoredFilesForUser(inDB.get());

		userRepository.delete(inDB.get());
	}
}
