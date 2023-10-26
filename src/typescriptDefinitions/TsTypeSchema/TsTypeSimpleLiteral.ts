import { ITsTypeLiteralSchema } from "../interfaces";

export class TsTypeSimpleLiteral implements ITsTypeLiteralSchema {
    isTsTypeLiteralSchema: boolean = true;
    isSimpleType: boolean = true;

    private _reference: string;
    get reference(): string { return this._reference; }

    setReference(reference: string): this { this._reference = reference; return this; }

    toJson(): Object {
        return {

        }
    }
}

