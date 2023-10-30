import { AttributeDefType } from '../../types'
import * as ts from "../../typescriptDefinitions"
import { XsSimpleTypeNode } from "../TypeDefinitionComponents"
import { XsNode } from "../XsNode"
import { TagType } from "../types"

export class XsAttributeNode extends XsNode {
    _tag: TagType = "xs:attribute"

    getType(): string { return this._attributes.get("type") }
    getName(): string { return this._attributes.name }
    getRef(): string { return this._attributes.ref }
    getFixed(): string { return this._attributes.get("fixed") }
    getUse(): string { return this._attributes.get("use") }

    getDefinition(): AttributeDefType {
        if (this.getRef()) {
            const an = this.tree.NodeStorage.getXsAttributeNode(this.getRef())
            if (an) return an.getDefinition();
            throw new Error("XsAttributeNode.getTsSchema | it has ref attribute but there is no attribute stored before by this ref");
        }

        if (!this.hasChildren()) {
            if (this.getName() && this.getType())
                return {
                    name: this.getName(),
                    optional: this.getUse() === "optional",
                    default: this.getFixed(),
                    type: { type: "type", itemType: this.getType() }
                }
        } else {
            return {
                name: this.getName(),
                optional: this.getUse() === "optional",
                default: this.getFixed(),
                type: this.firstChild<XsSimpleTypeNode>("xs:simpleType").getTsType()
            }
        }

        throw new Error("XsAttributeNode.getTsSchema | there is a problem.");

    }
}