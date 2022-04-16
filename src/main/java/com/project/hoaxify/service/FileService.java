package com.project.hoaxify.service;

import com.project.hoaxify.configuration.AppConfiguration;
import com.project.hoaxify.entity.FileAttachment;
import com.project.hoaxify.entity.User;
import com.project.hoaxify.repository.FileAttachmentRepository;
import org.apache.tika.Tika;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@EnableScheduling
public class FileService {
	private final AppConfiguration appConfiguration;

	private Tika tika;
	private final FileAttachmentRepository fileAttachmentRepository;

	public FileService(AppConfiguration appConfiguration, FileAttachmentRepository fileAttachmentRepository) {
		this.appConfiguration = appConfiguration;
		this.fileAttachmentRepository = fileAttachmentRepository;
		this.tika = new Tika();
	}

	public String writeBase64EncodedStringToFile(String image) throws IOException {

		String fileName = generateRandonName();

		byte[] base64encoded = Base64.getDecoder().decode(image);
		String fileType[] = detectType(base64encoded).split("/");
		fileName = fileName.concat(".").concat(fileType[1]);
		File target = new File(appConfiguration.getProfileStoragePath() + "/" + fileName);
		FileOutputStream outputStream = new FileOutputStream(target);
		outputStream.write(base64encoded);
		outputStream.close();
		return fileName;
	}

	public String generateRandonName() {

		return UUID.randomUUID().toString().replace("-", "");
	}

	public void deleteProfileimage(String oldImageName) {

		if (oldImageName == null) {
			return;
		}
		deleteFile(Paths.get(appConfiguration.getProfileStoragePath(), oldImageName));

	}

	public String detectType(byte[] array) {
		return (tika.detect(array));

	}

	public String detectType(String value) {
		byte[] base64encoded = Base64.getDecoder().decode(value);
		return (tika.detect(base64encoded));

	}

	public FileAttachment saveHoaxAttachment(MultipartFile multipartFile) {
		String fileName = generateRandonName();

		String fileType[] = null;
		try {
			fileType = detectType(multipartFile.getBytes()).split("/");
			fileName = fileName.concat(".").concat(fileType[1]);
			File target = new File(appConfiguration.getAttachmnetStoragePath() + "/" + fileName);
			FileOutputStream outputStream = new FileOutputStream(target);
			outputStream.write(multipartFile.getBytes());
			outputStream.close();

		} catch (IOException e) {
			e.printStackTrace();

		}

		FileAttachment attachment = new FileAttachment();
		attachment.setName(fileName);
		attachment.setDate(new Date());

		attachment.setFileType(fileType[0]);

		return fileAttachmentRepository.save(attachment);
	}

	@Scheduled(fixedRate = 24 * 60 * 60 * 1000)
	public void cleanUpStorage() {
		Date twentyFourHoursAgo = new Date(System.currentTimeMillis() - (24 * 60 * 60 * 1000));
		List<FileAttachment> filesToBedeleted =
				fileAttachmentRepository.findByDateBeforeAndHoaxIsNull(twentyFourHoursAgo);
		filesToBedeleted.forEach(line -> {

			deleteAttachmentFile(line.getName());

			fileAttachmentRepository.deleteById(line.getId());
		});
	}

	private void deleteFile(Path path) {
		try {
			Files.deleteIfExists(path);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void deleteAttachmentFile(String oldAtachment) {

		if (oldAtachment == null) {
			return;
		}
		deleteFile(Paths.get(appConfiguration.getAttachmnetStoragePath(), oldAtachment));

	}

	public void deleteAllStoredFilesForUser(User user) {
		deleteProfileimage(user.getImage());
		List<FileAttachment> filesToBeRemoved = fileAttachmentRepository.findByHoaxUser(user);

		filesToBeRemoved.forEach(line -> deleteAttachmentFile(line.getName()));

	}
}
