package com.project.hoaxify.service;
import com.project.hoaxify.entity.User;
import com.project.hoaxify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class UserImpl  implements UserService {

	private UserRepository userRepository;

	PasswordEncoder passwordEncoder;
	@Autowired
	public UserImpl(UserRepository userRepository,PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override public User createUser(User user) {
		String encrytptedPasssword=this.passwordEncoder.encode(user.getPassword());
		user.setPassword(encrytptedPasssword);
		return userRepository.save(user);
	}

	@Override public Optional<User> findByUsername(String name) {
		return userRepository.findByUsername(name);
	}

	@Override public boolean encoding(String code) {
		String base64encoded=code.split("Basic ")[1];
		String decoded= new String( Base64.getDecoder().decode(base64encoded));
		String parts[] =decoded.split(":");
	   Optional<User>  user=userRepository.findByUsername(parts[0]);
	   if (user.isEmpty()){

		   return false;

	   }else{
		   String hasPassword=user.get().getPassword();
		   if (passwordEncoder.matches(parts[1],hasPassword)){
			   return true;

		   }else {
			   return false;
		   }
	   }

	}

	@Override public List<User> findAll() {
		return userRepository.findAll();
	}
}
