import { TsTypeSchema } from "./TsTypeSchema";
import { ITsDefinitionSchema, ITsTypeLiteralSchema } from "./interfaces";

export class TsAttributeSchema implements ITsDefinitionSchema {
    isAttributeSchema: boolean = true;

    private _name?: string;
    private _optional: boolean = false;
    private _type: ITsTypeLiteralSchema;
    private _ref?: string;
    private _default?: string;
    private _usage: "definition" | "ref"

    get name(): string { return this._name; }
    get optional(): boolean { return this._optional; }
    get type(): ITsTypeLiteralSchema { return this._type; }
    get ref(): string { return this._ref; }
    get default(): string { return this._default; }
    get usage(): "definition" | "ref" { return this._usage; }

    setOptional(): this { this._optional = true; return this; }
    setRequired(): this { this._optional = false; return this; }
    setAsDefinition(): this { this._usage = "definition"; return this; }
    setAsRef(): this { this._usage = "ref"; return this; }
    setType(type: ITsTypeLiteralSchema): this { this._type = type; return this; }
    setRef(ref: string): this { this._ref = ref; return this; }
    setDefault(value: string): this { this._default = value; return this; }
    setName(name: string): this { this._name = name; return this; }


    toJson(): Object {
        return {
            name: this.name,
            optional: this.optional,
            type: this.type.toJson(),
            ref: this.ref,
            default: this.default,
            usage: this.usage,
        }
    }

}