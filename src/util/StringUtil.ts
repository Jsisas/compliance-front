export class StringUtil {
	static lowerCameltoUpperCamel(str: string): string {
		const capitalRegex = /([A-Z])/g;
		const spacedString = str.replace(capitalRegex, ' $1').trim();
		return this.capitalize(spacedString);
	}

	static humanizeSnakeCase(str: string): string {
		const spacedString = str.replace('_', ' ').trim();
		return this.capitalize(spacedString);
	}

	static capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	static shortenStringLength(str: string, length: number): string {
		const trimmedString = str.substr(0, length);
		return trimmedString.substr(
			0,
			Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
		);
	}

	static stringIncludes(string: string, includes: string): boolean {
		return string.toLowerCase().includes(includes.toLowerCase());
	}
}

export default StringUtil;
