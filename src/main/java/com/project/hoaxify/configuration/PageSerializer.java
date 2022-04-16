package com.project.hoaxify.configuration;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.domain.Page;

import java.io.IOException;

@JsonComponent
public class PageSerializer extends JsonSerializer<Page<?>> {
	@Override
	public void serialize(Page<?> value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
		gen.writeStartObject();

		gen.writeFieldName("content");
		serializers.defaultSerializeValue(value.getContent(), gen);
		gen.writeObjectField("pageable", value.getPageable());
		gen.writeObjectField("sort", value.getSort());
		gen.writeBooleanField("last", value.isLast());
		gen.writeBooleanField("first", value.isFirst());
		gen.writeBooleanField("empty", value.isEmpty());
		gen.writeNumberField("totalPages", value.getTotalPages());
		gen.writeNumberField("totalElements", value.getTotalElements());
		gen.writeNumberField("size", value.getSize());
		gen.writeNumberField("number", value.getNumber());
		gen.writeNumberField("numberOfElements", value.getNumberOfElements());
		gen.writeEndObject();

	}
}
