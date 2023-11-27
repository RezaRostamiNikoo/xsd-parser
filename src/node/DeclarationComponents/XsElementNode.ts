import { ClassGenerator, createArrayTypeNode, createTypeReferenceNode } from 'write-ts';
import { ElementDefType } from '../../types';
import { XsComplexTypeNode } from '../TypeDefinitionComponents';
import { XsNode } from "../XsNode";
import { TagType } from "../types";
import { TypeNode } from 'typescript';

export class XsElementNode extends XsNode {
    _tag: TagType = "xs:element";

    private definition: ElementDefType;


    isOptional(): boolean {
        return this.attribute.get('nillable') === "true"
    }

    isArray(): boolean {
        const maxOccurs = this.attribute.get('maxOccurs')
        return (maxOccurs === "unbounded" || maxOccurs > "1")
    }
    canBeEmptyArray(): boolean {
        const minOccurs = this.attribute.get('minOccurs')
        return minOccurs === "0"
    }

    private getType(typeNode: TypeNode): TypeNode {
        return this.isArray()
            ? createArrayTypeNode(typeNode)
            : typeNode
    }

    getDefinition(): ElementDefType {
        if (this.definition) return this.definition
        if (this.isSelfClosing() && this.attribute.ref) {
            return this.definition = {
                type: this.getType(createTypeReferenceNode(this.attribute.ref)),
                optional: this.isOptional(),
                name: this.tree.NodeStorage.getXsElementNode(this.attribute.ref).attribute.name,
                isArray: this.isArray(),
            }
        }

        if (this.isSelfClosing() && this.attribute.name) {
            return this.definition = {
                name: this.attribute.name,
                type: this.attribute.get('type')
                    ? this.getType(createTypeReferenceNode(this.attribute.get('type')))
                    : this.getType(this.tree.NodeStorage.getPrimitive(this.attribute.get('type'))?.type),
                optional: this.isOptional(),
                isArray: this.isArray(),
            }
        }

        if (this.hasChildren("xs:complexType"))
            return this.definition = {
                name: this.attribute.name,
                type: this.getType(this.firstChild<XsComplexTypeNode>("xs:complexType").toTypeNode()),
                optional: this.isOptional(),
                isArray: this.isArray(),
            }

        throw new Error('XsElementNode.getDefinition | there is a problem')
    }

}