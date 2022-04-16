package com.project.hoaxify.dto.response;

import com.project.hoaxify.entity.Hoax;
import lombok.Data;

@Data
public class HoaxResponseDto {
	private long id;
	private String content;
	private long timestamp;
	private UserResponseDto user;
	private FileAttachmentResponseDto fileAttachment;

	public HoaxResponseDto(Hoax hoax) {
		this.setId(hoax.getId());
		this.setContent(hoax.getContent());
		this.setTimestamp(hoax.getTimestamp().getTime());
		this.setUser(new UserResponseDto(hoax.getUser()));
		if (hoax.getFileAttachment() != null) {
			this.setFileAttachment(new FileAttachmentResponseDto(hoax.getFileAttachment()));
		}

	}
}
