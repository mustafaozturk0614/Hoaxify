package com.project.hoaxify.dto.response;

import com.project.hoaxify.entity.FileAttachment;
import lombok.Data;

@Data
public class FileAttachmentResponseDto {
	private String name;
	private String fileType;

	public FileAttachmentResponseDto(FileAttachment fileAttachment) {
		this.setName(fileAttachment.getName());
		this.setFileType(fileAttachment.getFileType());

	}
}
