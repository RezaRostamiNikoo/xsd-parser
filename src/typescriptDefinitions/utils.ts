import { TsAttributeSchema } from "./TsAttributeSchema";
import { TsEnumSchema } from "./TsEnumSchema";
import { TsSchema } from "./TsSchema";
import { TsTypeReferenceSchema } from "./TsTypeReferenceSchema";
import { TsTypeSchema, TsTypeSimpleLiteral } from "./TsTypeSchema";
import { TsArrayTypeLiteral } from "./TsTypeSchema/TsTypeArrayLiteral";
import { TsTypeUnionLiteral } from "./TsTypeSchema/TsTypeUnionLiteral";
import { ITsTypeLiteralSchema } from "./interfaces";

export function makeEnumDefinition(reference: string, items: Array<string>): TsSchema {
    const result = new TsSchema().setType("enum");
    result.setDefinition(TsEnumSchema.makeEnumDefinition(reference, items));
    return result;
}
export function makeEnumItems(items: Array<string>): TsSchema {
    const result = new TsSchema().setType("enum");
    result.setDefinition(TsEnumSchema.makeEnumItems(items));
    return result;
}

export function makeArrayType(type: string, reference?: string): TsSchema {
    const ttd = new TsSchema().setType("type");
    if (reference)
        ttd.setDefinition(TsTypeSchema.makeTypeDefinition(reference, new TsArrayTypeLiteral().setType(type)));
    else
        ttd.setDefinition(TsTypeSchema.makeTypeLiteral(new TsArrayTypeLiteral().setType(type)));
    return ttd;
}

export function makeSimpleType(typeRefrence: string, reference?: string): TsSchema {
    const ttd = new TsSchema().setType("type");
    if (reference)
        ttd.setDefinition(TsTypeSchema.makeTypeDefinition(reference, new TsTypeSimpleLiteral().setReference(typeRefrence)));
    else
        ttd.setDefinition(TsTypeSchema.makeTypeLiteral(new TsTypeSimpleLiteral().setReference(typeRefrence)));
    return ttd;
}

export function makeUnionType(items: string[], reference?: string): TsSchema {
    const ttd = new TsSchema().setType("type");
    if (reference)
        ttd.setDefinition(TsTypeSchema.makeTypeDefinition(reference, new TsTypeUnionLiteral().setItems(items)));
    else
        ttd.setDefinition(TsTypeSchema.makeTypeLiteral(new TsTypeUnionLiteral().setItems(items)));
    return ttd;
}

export function makeTypeReference(reference: string): TsSchema {
    const ttd = new TsSchema().setType("reference");
    ttd.setDefinition(new TsTypeReferenceSchema(reference));
    return ttd;
}

export function makeType(typeListeralSchema: ITsTypeLiteralSchema, reference?: string) {
    const result = new TsSchema().setType("type");
    const tts = new TsTypeSchema().setReference(reference).setAsLiteral().setLiteral(typeListeralSchema)
    result.setDefinition(tts);
    return result;
}


export function makeAttribute(name: string, type: ITsTypeLiteralSchema, oprional: boolean = false, defaultValue: string = undefined): TsSchema {
    const attr = new TsAttributeSchema();
    attr.setName(name).setType(type).setAsDefinition().setDefault(defaultValue);
    if (oprional) attr.setOptional();
    return new TsSchema().setType("attribute").setDefinition(attr);
}


export function makeAttributeRef(ref: string, oprional: boolean = false, defaultValue: string = undefined): TsSchema {
    const attr = new TsAttributeSchema();
    attr.setRef(ref).setAsRef().setDefault(defaultValue);
    if (oprional) attr.setOptional();
    return new TsSchema().setType("attribute").setDefinition(attr);
}