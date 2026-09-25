package com.fpt.framework.web.api.configuration;

import com.fpt.framework.data.exception.DataException;
import com.fpt.framework.data.exception.DataIsNotFoundException;
import com.fpt.framework.web.api.exception.InvalidParameterException;
import com.fpt.framework.web.api.model.ServerErrorResponse;
import com.fpt.framework.web.api.model.ValidationErrorResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.support.WebExchangeBindException;
import org.springframework.web.server.MissingRequestValueException;

import java.util.List;

@RestControllerAdvice
@Slf4j
public class RestApiControllerAdvice {

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ValidationErrorResponse onConstraintValidationException(
            ConstraintViolationException e) {
        ValidationErrorResponse error = new ValidationErrorResponse();
        for (ConstraintViolation violation : e.getConstraintViolations()) {
            error.getErrors().add(
                    ValidationErrorResponse.Violation.builder().name(violation.getPropertyPath().toString())
                            .message(violation.getMessage()).build());
        }
        return error;
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    ServerErrorResponse onExceptionUnHandle(
            Exception e) {
        log.error("Error not yet handle!!!", e);
       return ServerErrorResponse.builder().error(e.getMessage()).stackTrace(e.getStackTrace()[0]).build();
    }

    @ExceptionHandler(WebExchangeBindException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationErrorResponse onMethodArgumentNotValidException(
            WebExchangeBindException e) {
        ValidationErrorResponse error = new ValidationErrorResponse();
        List<FieldError> errors = e.getBindingResult().getFieldErrors();
        for (FieldError fieldError : errors) {
            error.getErrors().add(
                    ValidationErrorResponse.Violation.builder().name(fieldError.getField())
                            .message(fieldError.getDefaultMessage()).build());
        }
        return error;
    }
    @ExceptionHandler(MissingRequestValueException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationErrorResponse onRequiredParameterException(
            MissingRequestValueException e) {
        ValidationErrorResponse error = new ValidationErrorResponse();
        error.getErrors().add(ValidationErrorResponse.Violation.builder().name(e.getName())
                .message(e.getMessage()).build());
        return error;
    }

    @ExceptionHandler(DataException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationErrorResponse onResourceDataIsNotFound(
            DataException e) {
        ValidationErrorResponse error = new ValidationErrorResponse();
        error.getErrors().add(ValidationErrorResponse.Violation.builder().name(e.getResource()).code(e.getCode())
                .message(e.getMessage()).build());
        return  error;
    }

    @ExceptionHandler(InvalidParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationErrorResponse onInvalidParameterException(
            InvalidParameterException e) {
        ValidationErrorResponse error = new ValidationErrorResponse();
        error.getErrors().add(ValidationErrorResponse.Violation.builder().name(e.getName())
                .message(e.getMessage()).build());
        return error;
    }
}
