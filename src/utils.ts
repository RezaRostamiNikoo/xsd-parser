export function normalizingName(name: string): string {
    return name
        .replace('ifc:', '')
        .replace('xs:', '')
        .replace('-', '_')

}