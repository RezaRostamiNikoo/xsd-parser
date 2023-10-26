import { ITsTypeLiteralSchema, ITsTypeSchema } from "../interfaces";
import { TypeUsage } from "../types";

export class TsTypeSchema implements ITsTypeSchema {
    isTypeSchema: boolean = true;

    private _usage: TypeUsage;
    private _reference?: string;
    private _literal: ITsTypeLiteralSchema;


    get usage(): TypeUsage { return this._usage; }
    get reference(): string { return this._reference; }
    get literal(): ITsTypeLiteralSchema { return this._literal; }

    setAsLiteral(): this { this._usage = "literal"; return this; }
    setAsDefinition(): this { this._usage = "definition"; return this; }
    setReference(value: string): this { this._reference = value; return this; }
    setLiteral(value: ITsTypeLiteralSchema): this { this._literal = value; return this; }



    public static makeTypeLiteral(literal: ITsTypeLiteralSchema): TsTypeSchema {
        return new TsTypeSchema().setAsLiteral().setLiteral(literal);
    }

    public static makeTypeDefinition(reference: string, literal: ITsTypeLiteralSchema): TsTypeSchema {
        return new TsTypeSchema().setAsDefinition().setReference(reference).setLiteral(literal);
    }

    toJson(): Object {
        return {
            usage: this.usage,
            reference: this.reference,
            literal: this.literal.toJson()
        }
    }

}



