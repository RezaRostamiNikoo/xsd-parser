import { ITsTypeLiteralSchema } from "../interfaces";

export class TsArrayTypeLiteral implements ITsTypeLiteralSchema {
    isArrayType: boolean = true;

    private _type: string;
    get type(): string { return this._type; }

    setType(type: string): this { this._type = type; return this; }

    toJson(): Object {
        return {

        }
    }
}