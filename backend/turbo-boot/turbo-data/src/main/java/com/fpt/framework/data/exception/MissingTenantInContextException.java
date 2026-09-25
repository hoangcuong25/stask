package com.fpt.framework.data.exception;

public class MissingTenantInContextException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 7816468656748794318L;

	public MissingTenantInContextException(String message) {
        super(message);
    }
}
