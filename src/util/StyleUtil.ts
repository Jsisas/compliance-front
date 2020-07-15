export function concatStyles(...str: string[]): string {
	let classNames = '';
	str.forEach((style: string, index: number) => {
		if (index === str.length - 1) {
			classNames = classNames.concat(style);
		} else {
			classNames = classNames.concat(style).concat(' ');
		}
	});
	return classNames;
}
