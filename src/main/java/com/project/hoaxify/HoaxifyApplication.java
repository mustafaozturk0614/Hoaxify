package com.project.hoaxify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication()

public class HoaxifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(HoaxifyApplication.class, args);
	}

	//	@Bean
	//	CommandLineRunner createInitialUsers(UserService userService, HoaxService hoaxService) {
	//		return (args) -> {
	//			try {
	//				userService.getByUsername("user1");
	//			} catch (Exception e) {
	//				for (int i = 1; i <= 25; i++) {
	//					User user = new User();
	//					user.setUsername("user" + i);
	//					user.setDisplayName("display" + i);
	//					user.setPassword("Password123");
	//					userService.createUser(user);
	//					for (int j = 1; j <= 20; j++) {
	//						HoaxRequestDto hoax = new HoaxRequestDto();
	//						hoax.setContent("hoax (" + j + ")");
	//						hoaxService.save(hoax, user);
	//					}
	//				}
	//			}
	//		};
	//	}
}
