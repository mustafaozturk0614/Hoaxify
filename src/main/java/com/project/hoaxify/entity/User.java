package com.project.hoaxify.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.hoaxify.annotaion.UniqeUserName;
import com.project.hoaxify.dto.response.Views;
import lombok.*;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
@Entity
@Table(name = "users")

public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull(message = "{hoaxify.constraints.username.NotNull.message}")
	@Size(min = 4,max=64)
	@UniqeUserName
	@JsonView(Views.Base.class)
	private String  username;
	@NotNull
	@Size(min = 2,max=64)
	@JsonView(Views.Base.class)
	private String displayName;

	@Email
	private  String email;
	@NotNull
	@Size(min = 8,max=255)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message="{hoaxify.constrain.password.Pattern.message}")
	private  String password;

	@JsonView(Views.Base.class) // response dönerken sadece bu verileri aldık
	private String image;



}


