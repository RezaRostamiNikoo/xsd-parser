import { mapToObject } from "../utils/map";

export class AttributeHandler {
    private _attrs: Map<string, string> = new Map();

    set(key: string, value: string): this {
        this._attrs.set(key, value);
        return this;
    }

    get(key: string): string { return this._attrs.get(key); }




    get name(): string { return this.get("name"); }
    get ref(): string { return this.get("name"); }


    toObject(): Object { return mapToObject(this._attrs); }
}