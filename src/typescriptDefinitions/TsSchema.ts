import { ITsDefinitionSchema, ITsSchema } from "./interfaces";
import { DefinitionType as SchemaType } from "./types";

export class TsSchema implements ITsSchema {
    type: SchemaType;
    definition: ITsDefinitionSchema;

    constructor(type: SchemaType) {
        this.type = type;
    }

    setDefinition(value: ITsDefinitionSchema) {
        this.definition = value;
    }

}

