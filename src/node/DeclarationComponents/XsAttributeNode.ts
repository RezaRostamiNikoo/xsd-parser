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

    getTsSchema(): ts.TsSchema {
        if (this.getRef()) {
            const an = this.tree.NodeStorage.getXsAttributeNode(this.getRef())
            if (an) return an.getTsSchema();
            throw new Error("XsAttributeNode.getTsSchema | it has ref attribute but there is no attribute stored before by this ref");
        }

        if (!this.hasChildren()) {
            if (this.getName() && this.getType()) {
                return ts.makeAttribute(
                    this.getName(),
                    new ts.TsTypeSimpleLiteral().setReference(this.getType()),
                    this.getUse() === "optional",
                    this.getFixed()) // attribute
            }
        } else {
            const sts = this.firstChild<XsSimpleTypeNode>("xs:simpleType").getTsSchema()
            if (this.getName() && !this.getRef() && sts.type === "type" && (sts.definition as ts.ITsTypeSchema).usage === "literal")
                return ts.makeAttribute(
                    this.getName(),
                    (sts.definition as ts.ITsTypeLiteralSchema),
                    this.getUse() === "optional",
                    this.getFixed()) // attribute
        }

        throw new Error("XsAttributeNode.getTsSchema | there is a problem.");

    }
}