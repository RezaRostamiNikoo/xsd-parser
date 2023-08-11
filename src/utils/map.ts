
/**
 * It convert a Map data structure to an Object data structure
 * @param {Map<string,any>} map 
 * @returns 
 */
export const mapToObject = (map: Map<string, any>): { [k: string]: any } =>
    Object.fromEntries(map.entries());
