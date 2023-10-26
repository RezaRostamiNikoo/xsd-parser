import { ITsDefinitionSchema, ITsSchema } from "./interfaces";
import { DefinitionType as SchemaType } from "./types";

export class TsSchema implements ITsSchema {
    private _type: SchemaType;
    private _definition: ITsDefinitionSchema;


    get type(): SchemaType { return this._type; }
    get definition(): ITsDefinitionSchema { return this._definition; }

    setDefinition(value: ITsDefinitionSchema): this { this._definition = value; return this; }
    setType(type: SchemaType): this { this._type = type; return this; }
}

