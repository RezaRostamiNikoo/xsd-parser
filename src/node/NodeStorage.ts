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
            "anyType": { identifier: 'anyType', itemType: 'any', type: 'type' },
            "anySimpleType": { identifier: 'anySimpleType', itemType: 'anyType', type: 'type' },
            "anyAtomicType": { identifier: 'anyAtomicType', itemType: 'anySimpleType', type: 'type' },
            // "string": { identifier: 'string', itemType: 'anyAtomicType', type: 'type' },
            "normalizedString": { identifier: 'normalizedString', itemType: 'string', type: 'type' },
            "token": { identifier: 'token', itemType: 'normalizedString', type: 'type' },
            "language": { identifier: 'language', itemType: 'token', type: 'type' },
            "NMTOKEN": { identifier: 'NMTOKEN', itemType: 'token', type: 'type' },
            "NMTOKENS": { identifier: 'NMTOKENS', itemType: 'NMTOKEN', type: 'arrayType' },
            "Name": { identifier: 'Name', itemType: 'token', type: 'type' },
            "NCName": { identifier: 'NCName', itemType: 'Name', type: 'type' },
            "ID": { identifier: 'ID', itemType: 'NCName', type: 'type' },
            "IDREF": { identifier: 'IDREF', itemType: 'NCName', type: 'type' },
            "dateTime": { identifier: 'dateTime', itemType: 'anyAtomicType', type: 'type' },
            // "boolean": { identifier: 'boolean', itemType: 'anyAtomicType', type: 'type' },
            "decimal": { identifier: 'decimal', itemType: 'anyAtomicType', type: 'type' },
            "double": { identifier: 'double', itemType: 'anyAtomicType', type: 'type' },
            "float": { identifier: 'float', itemType: 'anyAtomicType', type: 'type' },
            "integer": { identifier: 'integer', itemType: 'decimal', type: 'type' },
            "long": { identifier: 'long', itemType: 'integer', type: 'type' },
            "duration": { identifier: 'duration', itemType: 'integer', type: 'type' },
            "time": { identifier: 'time', itemType: 'anyAtomicType', type: 'type' },
            "date": { identifier: 'date', itemType: 'anyAtomicType', type: 'type' },
            "gYearMonth": { identifier: 'gYearMonth', itemType: 'integer', type: 'type' },
            "gYear": { identifier: 'gYear', itemType: 'integer', type: 'type' },
            "gMonthDay": { identifier: 'gMonthDay', itemType: 'integer', type: 'type' },
            "gDay": { identifier: 'gDay', itemType: 'integer', type: 'type' },
            "gMonth": { identifier: 'gMonth', itemType: 'integer', type: 'type' },
            "hexBinary": { identifier: 'hexBinary', itemType: 'anyAtomicType', type: 'type' },
            "base64Binary": { identifier: 'base64Binary', itemType: 'anyAtomicType', type: 'type' },
            "anyURI": { identifier: 'anyURI', itemType: 'anyAtomicType', type: 'type' },
            "QName": { identifier: 'QName', itemType: 'anyAtomicType', type: 'type' },
            "NOTATION": { identifier: 'NOTATION', itemType: 'anyAtomicType', type: 'type' },
        }

        Object.keys(p).forEach(k => {
            this._primitives.set(k, p[k])
        })
    }
}