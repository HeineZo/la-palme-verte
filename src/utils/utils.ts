export function arrayToString(array: string[]): string {
    // Affiche le contenu du tableau sous forme de chaîne de caractères, ajout un 'et' entre l'avent dernier et le dernier élément
    if (array.length === 0) return '';
    if (array.length === 1) return array[0];
    if (array.length === 2) return `${array[0]} et ${array[1]}`;
    return `${array.slice(0, -1).join(', ')}, et ${array[array.length - 1]}`;
}

/**
 * Clone une liste d'objets
 */
export function clone<T>(object: T[]): T[] {
    return JSON.parse(JSON.stringify(object)) as T[];
}
