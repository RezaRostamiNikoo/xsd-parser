export type TsType = {
    type: "enum" | "type" | "arrayType",
    identifier?: string,
    itemType?: string,
    enumItems?: Array<string>
}

export type AttributeType = {
    name: string,
    optional: boolean,
    default: string,
    type: TsType
}