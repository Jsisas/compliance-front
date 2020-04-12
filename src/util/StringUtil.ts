export function lowerCameltoUpperCamel(str: string): string {
    const capitalRegex = /([A-Z])/g;
    const spacedString = str.replace(capitalRegex, ' $1').trim();
    return capitalize(spacedString);
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}