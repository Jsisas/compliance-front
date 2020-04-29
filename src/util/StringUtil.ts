export function lowerCameltoUpperCamel(str: string): string {
    const capitalRegex = /([A-Z])/g;
    const spacedString = str.replace(capitalRegex, ' $1').trim();
    return capitalize(spacedString);
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function shortenStringLength(str: string, length: number) {
    let trimmedString = str.substr(0, length);
    return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
}

export function stringIncludes(string: string, includes: string){
    return string.toLowerCase().includes(includes.toLowerCase())
}