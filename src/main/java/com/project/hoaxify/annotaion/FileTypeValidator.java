package com.project.hoaxify.annotaion;

import com.project.hoaxify.service.FileService;
import org.hibernate.validator.constraintvalidation.HibernateConstraintValidatorContext;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.stream.Collectors;

public class FileTypeValidator implements ConstraintValidator<FileType, String> {
	private final FileService fileService;
	private String[] types;

	public FileTypeValidator(FileService fileService) {
		this.fileService = fileService;
	}

	@Override
	public void initialize(FileType constraintAnnotation) {
		this.types = constraintAnnotation.types();
	}

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null || value.isEmpty()) {
			return true;
		}
		String fileType = fileService.detectType(value);
		for (String supportedType : this.types) {
			if (fileType.contains(supportedType)) {
				return true;
			}
		}
		String supportedTypes = Arrays.stream(this.types).collect(Collectors.joining(", "));
		context.disableDefaultConstraintViolation();
		HibernateConstraintValidatorContext hibernateConstraintValidatorContext =
				context.unwrap(HibernateConstraintValidatorContext.class);
		hibernateConstraintValidatorContext.addMessageParameter("types", supportedTypes);
		hibernateConstraintValidatorContext.buildConstraintViolationWithTemplate(
				context.getDefaultConstraintMessageTemplate()).addConstraintViolation();
		return false;
	}
}
