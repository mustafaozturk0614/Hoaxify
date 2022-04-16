package com.project.hoaxify.dto.resquest;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class HoaxRequestDto {
	@Size(min = 1, max = 1000)
	private String content;
	private long attachmentId;
}
