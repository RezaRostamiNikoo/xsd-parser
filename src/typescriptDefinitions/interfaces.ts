import { TsTypeSchema } from "./TsTypeSchema";
import { DefinitionType, TypeUsage } from "./types";

export interface ITsSchema {
    type: DefinitionType;
    definition: ITsDefinitionSchema | Array<ITsDefinitionSchema>;

};

export interface ITsDefinitionSchema {

}


export interface ITsTypeSchema extends ITsDefinitionSchema {
    usage: TypeUsage;
    reference?: string;
    literal?: ITsTypeLiteralSchema;
}

export interface ITsTypeLiteralSchema {

}



//////////////////////
/// Enum

export interface ITsEnumSchema extends ITsDefinitionSchema {
    items: Array<string>;
    reference: string;
}


//////////////////////
/// Property
export interface ITsPropertySchema extends ITsDefinitionSchema {
    reference: string;
    type: TsTypeSchema;
}
