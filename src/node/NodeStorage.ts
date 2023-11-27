import { createTypeReferenceNode } from 'write-ts';
import { SimpleDefType } from '../types';
import { normalizingName } from '../utils';
import { makeid } from "../utils/helpers";
import { XsAttributeNode, XsElementNode } from "./DeclarationComponents";
import { XsAttributeGroupNode, XsGroupNode } from "./GroupDefinitionComponents";
import { XsComplexTypeNode, XsSimpleTypeNode } from "./TypeDefinitionComponents";
import { XsNode } from "./XsNode";

export class NodeStorage {
    private _elements: Map<string, XsElementNode> = new Map();
    private _complexTypes: Map<string, XsComplexTypeNode> = new Map();
    private _simpleTypes: Map<string, XsSimpleTypeNode> = new Map();
    private _attributes: Map<string, XsAttributeNode> = new Map();
    private _attributeGroups: Map<string, XsAttributeGroupNode> = new Map();
    private _groups: Map<string, XsGroupNode> = new Map();
    private _primitives: Map<string, SimpleDefType> = new Map()

    get attributes(): Map<string, XsAttributeNode> { return this._attributes }
    get primitives(): Map<string, SimpleDefType> { return this._primitives }

    constructor() {
        this.fillPrimitives()
    }

    add(node: XsNode) {
        if (!node.attribute.name) return;
        const name = 'ifc:' + node.attribute.name
        switch (node.Tag) {
            case "xs:element": return this._elements.set(normalizingName(name), node as XsElementNode);
            case "xs:complexType": return this._complexTypes.set(normalizingName(name), node as XsComplexTypeNode);
            case "xs:simpleType": return this._simpleTypes.set(normalizingName(name), node as XsSimpleTypeNode);
            case "xs:attribute": return this._attributes.set(normalizingName(name), node as XsAttributeNode);
            case "xs:attributeGroup": return this._attributeGroups.set(normalizingName(name), node as XsAttributeGroupNode);
            case "xs:group": return this._groups.set(normalizingName(name), node as XsGroupNode);
            default: return;
        }
    }


    getXsAttributeNode(name: string): XsAttributeNode { return this._attributes.get(normalizingName(name)) }
    getXsAttributeGroupNode(name: string): XsAttributeGroupNode { return this._attributeGroups.get(normalizingName(name)) }
    getXsElementNode(name: string): XsElementNode { return this._elements.get(normalizingName(name)) }
    getComplexType(name: string): XsComplexTypeNode { return this._complexTypes.get(normalizingName(name)) }
    getGroupNode(name: string): XsGroupNode { return this._groups.get(normalizingName(name)) }
    getPrimitive(name: string): SimpleDefType { return this._primitives.get(normalizingName(name)) }


    reset(): this {
        this._elements = new Map();
        this._complexTypes = new Map();
        this._simpleTypes = new Map();
        this._attributes = new Map();
        this._attributeGroups = new Map();
        this._groups = new Map();
        return this
    }

    fillPrimitives() {
        const p: { [key: string]: SimpleDefType } = {
            "anyType": { identifier: 'anyType', type: createTypeReferenceNode('any'), defType: 'type' },
            "anySimpleType": { identifier: 'anySimpleType', type: createTypeReferenceNode('anyType'), defType: 'type' },
            "anyAtomicType": { identifier: 'anyAtomicType', type: createTypeReferenceNode('anySimpleType'), defType: 'type' },
            // "string": { identifier: 'string', itemType: 'anyAtomicType', type: createTypeReferenceNode('type') },
            "normalizedString": { identifier: 'normalizedString', type: createTypeReferenceNode('string'), defType: 'type' },
            "token": { identifier: 'token', type: createTypeReferenceNode('normalizedString'), defType: 'type' },
            "language": { identifier: 'language', type: createTypeReferenceNode('token'), defType: 'type' },
            "NMTOKEN": { identifier: 'NMTOKEN', type: createTypeReferenceNode('token'), defType: 'type' },
            "NMTOKENS": { identifier: 'NMTOKENS', type: createTypeReferenceNode('NMTOKEN'), defType: 'arrayType' },
            "Name": { identifier: 'Name', type: createTypeReferenceNode('token'), defType: 'type' },
            "NCName": { identifier: 'NCName', type: createTypeReferenceNode('Name'), defType: 'type' },
            "ID": { identifier: 'ID', type: createTypeReferenceNode('NCName'), defType: 'type' },
            "IDREF": { identifier: 'IDREF', type: createTypeReferenceNode('NCName'), defType: 'type' },
            "dateTime": { identifier: 'dateTime', type: createTypeReferenceNode('anyAtomicType'), defType: 'type' },
            // "boolean": { identifier: 'boolean', itemType: 'anyAtomicType', type: createTypeReferenceNode('type') },
            "decimal": { identifier: 'decimal', type: createTypeReferenceNode('anyAtomicType'), defType: 'type' },
            "double": { identifier: 'double', type: createTypeReferenceNode('anyAtomicType'), defType: 'type' },
            "float": { identifier: 'float', type: createTypeReferenceNode('anyAtomicType'), defType: 'type' },
            "integer": { identifier: 'integer', type: createTypeReferenceNode('decimal'), defType: 'type' },
            "long": { identifier: 'long', type: createTypeReferenceNode('integer'), defType: 'type' },
            "duration": { identifier: 'duration', type: createTypeReferenceNode('integer'), defType: 'type' },
            "time": { identifier: 'time', type: createTypeReferenceNode('anyAtomicType'), defType: 'type' },
            "date": { identifier: 'date', type: createTypeReferenceNode('anyAtomicType'), defType: 'type' },
            "gYearMonth": { identifier: 'gYearMonth', type: createTypeReferenceNode('integer'), defType: 'type' },
            "gYear": { identifier: 'gYear', type: createTypeReferenceNode('integer'), defType: 'type' },
            "gMonthDay": { identifier: 'gMonthDay', type: createTypeReferenceNode('integer'), defType: 'type' },
            "gDay": { identifier: 'gDay', type: createTypeReferenceNode('integer'), defType: 'type' },
            "gMonth": { identifier: 'gMonth', type: createTypeReferenceNode('integer'), defType: 'type' },
            "hexBinary": { identifier: 'hexBinary', type: createTypeReferenceNode('anyAtomicType'), defType: 'type' },
            "base64Binary": { identifier: 'base64Binary', type: createTypeReferenceNode('anyAtomicType'), defType: 'type' },
            "anyURI": { identifier: 'anyURI', type: createTypeReferenceNode('anyAtomicType'), defType: 'type' },
            "QName": { identifier: 'QName', type: createTypeReferenceNode('anyAtomicType'), defType: 'type' },
            "NOTATION": { identifier: 'NOTATION', type: createTypeReferenceNode('anyAtomicType'), defType: 'type' },
        }

        Object.keys(p).forEach(k => {
            this._primitives.set(k, p[k])
        })
    }
}