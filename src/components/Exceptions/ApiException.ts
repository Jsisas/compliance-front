export enum ErrorCodes {
	NOT_FOUND = 404,
	INTERNAL_ERROR = 500,
}

export class ApiException extends Error {
	constructor(code: ErrorCodes) {
		super(code.toString());
		this.name = 'ApiException';
	}
}
