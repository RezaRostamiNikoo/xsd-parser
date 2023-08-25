import { TsEnumSchema } from "./TsEnumSchema";
import { TsSchema } from "./TsSchema";
import { TsTypeSchema, TsTypeSimpleLiteral } from "./TsTypeSchema";
import { TsArrayTypeLiteral } from "./TsTypeSchema/TsTypeArrayLiteral";
import { TsTypeUnionLiteral } from "./TsTypeSchema/TsTypeUnionLiteral";

export function makeEnum(reference: string, items: Array<string>): TsSchema {
    const result = new TsSchema("enum");
    result.setDefinition(TsEnumSchema.makeEnum(reference, items));
    return result;
}

export function makeArrayType(type: string, reference?: string): TsSchema {
    const ttd = new TsSchema("type");
    if (reference)
        ttd.setDefinition(TsTypeSchema.makeTypeDefinition(reference, new TsArrayTypeLiteral(type)));
    else
        ttd.setDefinition(TsTypeSchema.makeTypeLiteral(new TsArrayTypeLiteral(type)));
    return ttd;
}

export function makeSimpleType(type: string, reference?: string): TsSchema {
    const ttd = new TsSchema("type");
    if (reference)
        ttd.setDefinition(TsTypeSchema.makeTypeDefinition(reference, new TsTypeSimpleLiteral(type)));
    else
        ttd.setDefinition(TsTypeSchema.makeTypeLiteral(new TsTypeSimpleLiteral(type)));
    return ttd;
}

export function makeUnionType(types: string[], reference?: string): TsSchema {
    const ttd = new TsSchema("type");
    if (reference)
        ttd.setDefinition(TsTypeSchema.makeTypeDefinition(reference, new TsTypeUnionLiteral(types)));
    else
        ttd.setDefinition(TsTypeSchema.makeTypeLiteral(new TsTypeUnionLiteral(types)));
    return ttd;
}

export function makeTypeReference(reference: string): TsSchema {
    const ttd = new TsSchema("type");
    ttd.setDefinition(TsTypeSchema.makeTypeReference(reference));
    return ttd;
}
