export type TsType = {
    type: "enum" | "type" | "arrayType",
    identifier?: string,
    itemType?: string,
    enumItems?: Array<string>
}