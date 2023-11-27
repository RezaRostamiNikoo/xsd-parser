import { TypeNode } from 'typescript'
import { AttributeDefType } from '../../types'
import { XsSimpleTypeNode } from "../TypeDefinitionComponents"
import { XsNode } from "../XsNode"
import { TagType } from "../types"
import { createTypeReferenceNode } from 'write-ts'

export class XsAttributeNode extends XsNode {
    _tag: TagType = "xs:attribute"

    getType(): string { return this.attribute.get("type") }
    getName(): string { return this.attribute.name }
    getRef(): string { return this.attribute.ref }
    getFixed(): string { return this.attribute.get("fixed") }
    getUse(): string { return this.attribute.get("use") }

    isOptional(): boolean {
        return this.getUse() === "optional"
    }
    private definition: AttributeDefType;

    getDefinition(): AttributeDefType {
        if (this.definition) return this.definition
        if (this.getRef()) {
            const an = this.tree.NodeStorage.getXsAttributeNode(this.getRef())
            if (an) return (this.definition = {
                ...an.getDefinition(),
                optional: this.isOptional(),
            })
            throw new Error("XsAttributeNode.getTsSchema | it has ref attribute but there is no attribute stored before by this ref\n" + this.toXml())
        }

        if (!this.hasChildren()) {
            if (this.getName() && this.getType())
                return this.definition = {
                    name: this.getName(),
                    optional: this.isOptional(),
                    default: this.getFixed(),
                    type: createTypeReferenceNode(this.getType())
                }
        } else {
            return this.definition = {
                name: this.getName(),
                optional: this.isOptional(),
                default: this.getFixed(),
                type: this.firstChild<XsSimpleTypeNode>("xs:simpleType").getDefinition().type
            }
        }

        throw new Error("XsAttributeNode.getTsSchema | there is a problem.");

    }

}