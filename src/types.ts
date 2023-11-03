export type SimpleDefType = {
    type: "enum" | "type" | "arrayType",
    identifier?: string,
    itemType?: string,
    enumItems?: Array<string>
}

export type AttributeDefType = {
    name: string,
    optional?: boolean,
    default?: string,
    type?: string
    simpleType?: SimpleDefType
}

export type ExtensionDefType = {
    base: string
    attributes?: Array<AttributeDefType>,
    elements?: Array<{ optional: boolean, element: ElementDefType }>
}

export type ElementDefType = {
    name: string
    type?: string
    complexType?: ComplexDefType
    primitiveType?: string
}

export type ChoiceDefType = {
    elements: Array<ElementDefType>
}

export type SequenceDefType = {
    elements: Array<ElementDefType>
}

export type RestrictionDefType = {
    type: "enum" | "type" | "arrayType",
    identifier?: string,
    itemType?: string,
    enumItems?: Array<string>
}

export type ComplexDefType = {
    identifier?: string
    attributes?: Array<AttributeDefType>
    seqences?: Array<SequenceDefType>
    complexContent?: ComplexContentDefType
    simpleContent?: SimpleContentDefType
    groups?: Array<GroupDefType>
}

export type GroupDefType = {
    ref?: string
    name?: string
    choices?: ChoiceDefType
}

export type SimpleContentDefType = {
    extension?: ExtensionDefType
}

export type ComplexContentDefType = {
    restriction?: RestrictionDefType
    extension?: ExtensionDefType
}