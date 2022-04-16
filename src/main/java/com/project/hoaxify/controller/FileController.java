package com.project.hoaxify.controller;

import com.project.hoaxify.entity.FileAttachment;
import com.project.hoaxify.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class FileController {
	@Autowired
	FileService fileService;

	@PostMapping("/hoax-attachments")
	FileAttachment saveHoaxAttachments(MultipartFile file) {
		return fileService.saveHoaxAttachment(file);

	}

}
