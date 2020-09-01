export class Base64Util {
	static utf8_to_b64(str: string): string {
		return window.btoa(unescape(encodeURIComponent(str)));
	}

	static b64_to_utf8(str: string): string {
		return decodeURIComponent(escape(window.atob(str)));
	}
}
