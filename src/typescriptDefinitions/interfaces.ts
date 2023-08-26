import { TsTypeSchema } from "./TsTypeSchema";
import { DefinitionType, EnumUsage, TypeUsage } from "./types";

export interface ITsSchema {
    get type(): DefinitionType;
    get definition(): ITsDefinitionSchema | Array<ITsDefinitionSchema>;

};

export interface ITsDefinitionSchema {
    toJson(): Object;
}


export interface ITsTypeSchema extends ITsDefinitionSchema {
    get usage(): TypeUsage;
    get reference(): string;
    get literal(): ITsTypeLiteralSchema;
}

export interface ITsTypeLiteralSchema {
    toJson(): Object;
}



//////////////////////
/// Enum

export interface ITsEnumSchema extends ITsDefinitionSchema {
    get usage(): EnumUsage;
    get items(): Array<string>;
    get reference(): string;

}


//////////////////////
/// Property
export interface ITsPropertySchema extends ITsDefinitionSchema {
    get reference(): string;
    get type(): TsTypeSchema;
}
