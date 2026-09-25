package com.fpt.framework.web.api.configuration;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fpt.framework.utility.DateTimeUtility;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.http.codec.json.Jackson2JsonEncoder;
import org.springframework.web.reactive.config.WebFluxConfigurer;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Configuration
@Import({JacksonStringDeserializer.class, JacksonConfiguration.WebFluxConfig.class})
public class JacksonConfiguration {

	@Bean
	public ObjectMapper objectMapper() {
		JavaTimeModule module = new JavaTimeModule();
		module.addDeserializer(LocalDate.class, new LocalDateDeserializer());
		module.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer());
		module.addDeserializer(LocalTime.class, new LocalTimeDeserializer());

		module.addSerializer(LocalDate.class, new LocalDateSerializer());
		module.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer());
		module.addSerializer(LocalTime.class, new LocalTimeSerializer());
		ObjectMapper mapper = new ObjectMapper();
		mapper.registerModule(module);
		mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // Disables timestamps for dates
		return mapper;
	}

	@Configuration
	public class WebFluxConfig implements WebFluxConfigurer {

		private final ObjectMapper objectMapper;

		public WebFluxConfig(ObjectMapper objectMapper) {
			this.objectMapper = objectMapper;
		}

		@Override
		public void configureHttpMessageCodecs(ServerCodecConfigurer configurer) {
			configurer.defaultCodecs().jackson2JsonEncoder(new Jackson2JsonEncoder(objectMapper));
			configurer.defaultCodecs().jackson2JsonDecoder(new Jackson2JsonDecoder(objectMapper));
		}
	}

	class LocalDateTimeSerializer extends JsonSerializer<LocalDateTime> {
		@Override
		public void serialize(LocalDateTime value, JsonGenerator gen, SerializerProvider serializers)
				throws IOException {
			gen.writeString(DateTimeUtility.format(value));
		}
	}

	class LocalDateSerializer extends JsonSerializer<LocalDate> {
		@Override
		public void serialize(LocalDate value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
			gen.writeString(DateTimeUtility.format(value));
		}
	}

	class LocalTimeSerializer extends JsonSerializer<LocalTime> {
		@Override
		public void serialize(LocalTime value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
			gen.writeString(DateTimeUtility.format(value));
		}
	}

	class LocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {
		@Override
		public LocalDateTime deserialize(JsonParser p, DeserializationContext context) throws IOException {
			return DateTimeUtility.parseDateTime(p.getValueAsString());
		}
	}

	class LocalDateDeserializer extends JsonDeserializer<LocalDate> {
		@Override
		public LocalDate deserialize(JsonParser p, DeserializationContext context) throws IOException {
			return DateTimeUtility.parseDate(p.getValueAsString());
		}
	}

	class LocalTimeDeserializer extends JsonDeserializer<LocalTime> {
		@Override
		public LocalTime deserialize(JsonParser p, DeserializationContext context) throws IOException {
			return DateTimeUtility.parseTime(p.getValueAsString());
		}
	}
}
