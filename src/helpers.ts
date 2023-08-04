export const mapToObject = (map: Map<string, any>): { [k: string]: any } =>
    Object.fromEntries(map.entries());
