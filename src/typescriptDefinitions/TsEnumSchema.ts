import { ITsEnumSchema } from "./interfaces";
import { EnumUsage } from "./types";

export class TsEnumSchema implements ITsEnumSchema {
    isEnumSchema: boolean = true;

    private _usage: EnumUsage;
    private _items: string[];
    private _reference?: string;

    get usage(): EnumUsage { return this._usage; };
    get items(): Array<string> { return this._items; };
    get reference(): string { return this._reference };

    setReference(reference: string): this { this._reference = reference; return this; }
    setItems(items: Array<string>): this { this._items = items; return this; }
    setAsDefinition(): this { this._usage = "definition"; return this; }
    setAsItems(): this { this._usage = "items"; return this; }

    public static makeEnumDefinition(reference: string, items: Array<string>): TsEnumSchema {
        return new TsEnumSchema().setAsDefinition().setReference(reference).setItems(items);
    }

    public static makeEnumItems(items: Array<string>): TsEnumSchema {
        return new TsEnumSchema().setAsItems().setItems(items);
    }

    toJson(): Object {
        return {}
    }
}