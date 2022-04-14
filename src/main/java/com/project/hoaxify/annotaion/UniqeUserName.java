package com.project.hoaxify.annotaion;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = { UniqeUserNameValidator.class })
public @interface UniqeUserName {

	String message() default "{hoaxify.constraint.username.UniqUsername.message}";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
