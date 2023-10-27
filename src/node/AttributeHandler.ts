import { mapToObject } from "../utils/map";

export class AttributeHandler {
    private _attrs: Map<string, string> = new Map()

    set(key: string, value: string): this {
        this._attrs.set(key, value)
        return this
    }

    get(key: string): string { return this._attrs.get(key); }

    get name(): string { return this._attrs.get('name') }
    get ref(): string { return this._attrs.get('ref') }

    toObject(): Object { return mapToObject(this._attrs) }

    /**
     * returns all the attributes as a text
     * @example
     * key1="value1" key2="value2" ...
     */
    toText(): string {
        return Array.from(this._attrs.keys())
            .map(key => `${key}="${this._attrs.get(key)}"`).join(' ')
    }
}