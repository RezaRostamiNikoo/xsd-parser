
/**
 * It converts an Object data structur to a Map data structur.
 * @param {Object} obj 
 */
export function objectToMap(obj: { [key: string]: any }): Map<string, any> {
    const result: Map<string, any> = new Map();
    Object.keys(obj).forEach(key => {
        result.set(key, obj[key]);
    });
    return result;
}