import { AttributeDefType } from '../../types';
import { ITsDefinitionSchema } from "../../typescriptDefinitions";
import { XsAttributeNode } from '../DeclarationComponents';
import { XsNode } from "../XsNode";
import { TagType } from "../types";

export class XsAttributeGroupNode extends XsNode {
    _tag: TagType = "xs:attributeGroup";

    getName(): string { return this._attributes.get("name"); }
    getRef(): string { return this._attributes.get("ref"); }

    getDefinitions(): Array<AttributeDefType> {
        if (this.isSelfClosing && this.getRef()) {
            const ag = this.tree.NodeStorage.getXsAttributeGroupNode(this.getRef())
            if (ag) return ag.getDefinitions()
        } else if (!this.isSelfClosing() && this.getName()) {
            return this.getChildren<XsAttributeNode>("xs:attribute")
                .map(attr => attr.getDefinition())
        }

        throw new Error("XsAttributeGroupNode.checks | there is a problem");
    }
}