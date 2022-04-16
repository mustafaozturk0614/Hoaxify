package com.project.hoaxify.dto.resquest;

import com.project.hoaxify.annotaion.FileType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserUpdateRequestDto {
	@NotNull
	@Size(min = 2, max = 64)
	private String displayName;
	@FileType(types = { "jpeg", "png" })
	private String image;
}
