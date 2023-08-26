import { TsAttributeSchema } from "./TsAttributeSchema";
import { TsEnumSchema } from "./TsEnumSchema";
import { TsSchema } from "./TsSchema";
import { TsTypeReferenceSchema } from "./TsTypeReferenceSchema";
import { TsTypeSchema, TsTypeSimpleLiteral } from "./TsTypeSchema";
import { TsArrayTypeLiteral } from "./TsTypeSchema/TsTypeArrayLiteral";
import { TsTypeUnionLiteral } from "./TsTypeSchema/TsTypeUnionLiteral";
import { ITsTypeLiteralSchema } from "./interfaces";

export function makeEnumDefinition(reference: string, items: Array<string>): TsSchema {
    const result = new TsSchema("enum");
    result.setDefinition(TsEnumSchema.makeEnumDefinition(reference, items));
    return result;
}
export function makeEnumItems(items: Array<string>): TsSchema {
    const result = new TsSchema("enum");
    result.setDefinition(TsEnumSchema.makeEnumItems(items));
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
    const ttd = new TsSchema("reference");
    ttd.setDefinition(new TsTypeReferenceSchema(reference));
    return ttd;
}

export function makeType(typeListeralSchema: ITsTypeLiteralSchema, reference?: string) {
    const result = new TsSchema("type");
    const tts = new TsTypeSchema();
    tts.reference = reference;
    tts.literal = typeListeralSchema;
    tts.usage = reference ? "definition" : "literal";
    result.setDefinition(tts);
    return result;
}


export function makeAttribute(name: string, type: string, oprional: boolean = false, defaultValue: string = undefined): TsSchema {
    const attr = new TsAttributeSchema();
    attr.setName(name).setType(type).setAsDefinition();
    if (oprional) attr.setOptional();
    if (defaultValue) attr.setDefault(defaultValue);
    return new TsSchema("attribute").setDefinition(attr);
}


export function makeAttributeRef(ref: string, oprional: boolean = false, defaultValue: string = undefined): TsSchema {
    const attr = new TsAttributeSchema();
    attr.setRef(ref).setAsRef();
    if (oprional) attr.setOptional();
    if (defaultValue) attr.setDefault(defaultValue);
    return new TsSchema("attribute").setDefinition(attr);
}