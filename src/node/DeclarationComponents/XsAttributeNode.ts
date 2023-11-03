import { AttributeDefType } from '../../types'
import { XsSimpleTypeNode } from "../TypeDefinitionComponents"
import { XsNode } from "../XsNode"
import { TagType } from "../types"

export class XsAttributeNode extends XsNode {
    _tag: TagType = "xs:attribute"

    getType(): string { return this.attribute.get("type") }
    getName(): string { return this.attribute.name }
    getRef(): string { return this.attribute.ref }
    getFixed(): string { return this.attribute.get("fixed") }
    getUse(): string { return this.attribute.get("use") }

    private definition: AttributeDefType;

    getDefinition(): AttributeDefType {
        if (this.definition) return this.definition
        if (this.getRef()) {
            const an = this.tree.NodeStorage.getXsAttributeNode(this.getRef())
            if (an) return this.definition = an.getDefinition()
            throw new Error("XsAttributeNode.getTsSchema | it has ref attribute but there is no attribute stored before by this ref\n" + this.toXml())
        }

        if (!this.hasChildren()) {
            if (this.getName() && this.getType())
                return this.definition = {
                    name: this.getName(),
                    optional: this.getUse() === "optional",
                    default: this.getFixed(),
                    type: this.getType()
                }
        } else {
            return this.definition = {
                name: this.getName(),
                optional: this.getUse() === "optional",
                default: this.getFixed(),
                simpleType: this.firstChild<XsSimpleTypeNode>("xs:simpleType").getDefinition()
            }
        }

        throw new Error("XsAttributeNode.getTsSchema | there is a problem.");

    }
}