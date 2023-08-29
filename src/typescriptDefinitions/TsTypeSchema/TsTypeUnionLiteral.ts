import { ITsTypeLiteralSchema } from "../interfaces";

export class TsTypeUnionLiteral implements ITsTypeLiteralSchema {
    isTsTypeLiteralSchema: boolean = true;
    isUnionType: boolean = true;

    private _items: Array<string>;
    get items(): Array<string> { return this._items; }

    setItems(items: Array<string>): this { this._items = items; return this; }

    toJson(): Object {
        return {

        }
    }
}

