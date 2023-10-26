
export function makeid(length: number = 10): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export function getAttrsAsObject(node: Element): Object {
    const result: { [key: string]: any } = {};
    for (let i = 0; i < node.attributes.length; i++)
        result[node.attributes[i].name] = node.attributes[i].value;
    return result;
}

export function getAttrsAsMap(node: Element): Map<string, string> {
    const result: Map<string, string> = new Map();
    for (let i = 0; i < node.attributes.length; i++)
        result.set(node.attributes[i].name, node.attributes[i].value)
    return result;
}

export function getAttrsAsArray(node: Element): Array<Array<string>> {
    const result: Array<Array<string>> = [];
    for (let i = 0; i < node.attributes.length; i++)
        result.push([node.attributes[i].name, node.attributes[i].value])
    return result;
}