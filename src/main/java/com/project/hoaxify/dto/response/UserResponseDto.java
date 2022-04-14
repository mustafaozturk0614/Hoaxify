package com.project.hoaxify.dto.response;

import com.project.hoaxify.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResponseDto {
	String username;
	String displayName;
	String image;

	public UserResponseDto(User user) {
		this.username = user.getUsername();
		this.displayName = user.getDisplayName();
		this.image = user.getImage();
	}
}
