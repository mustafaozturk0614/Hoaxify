package com.project.hoaxify.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class AuthorizationException extends RuntimeException {
	@Serial
	private static final long serialVersionUID = 7354239949166562707L;
}
