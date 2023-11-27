import { TypeNode } from 'typescript'

export type SimpleDefType = {
    defType: "enum" | "type" | "arrayType",
    identifier?: string,
    type?: TypeNode,
    enumItems?: Array<string>
}
export type RestrictionDefType = {
    defType: "enum" | "type" | "arrayType",
    identifier?: string,
    type?: TypeNode,
    enumItems?: Array<string>
}
export type AttributeDefType = {
    name: string,
    optional?: boolean,
    default?: string,
    type?: TypeNode
}

export type ExtensionDefType = {
    base: string
    attributes?: Array<AttributeDefType>,
    elements?: Array<ElementDefType>
}

export type ElementDefType = {
    optional: boolean
    isArray: boolean
    name: string
    type: TypeNode
}

export type ChoiceDefType = {
    elements: Array<ElementDefType>
}

export type SequenceDefType = {
    elements: Array<ElementDefType>
}



export type ComplexDefType = {
    identifier?: string
    attributes?: Array<AttributeDefType>
    sequences?: Array<SequenceDefType>
    complexContent?: ComplexContentDefType
    simpleContent?: SimpleContentDefType
    groups?: Array<GroupDefType>
}

export type GroupDefType = {
    name?: string
    type?: TypeNode
}

export type SimpleContentDefType = {
    extension?: ExtensionDefType
}

export type ComplexContentDefType = {
    restriction?: RestrictionDefType
    extension?: ExtensionDefType
}