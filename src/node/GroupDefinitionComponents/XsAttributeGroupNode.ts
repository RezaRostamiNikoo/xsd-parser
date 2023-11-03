import { AttributeDefType } from '../../types';
import { XsAttributeNode } from '../DeclarationComponents';
import { XsNode } from "../XsNode";
import { TagType } from "../types";

export class XsAttributeGroupNode extends XsNode {
    _tag: TagType = "xs:attributeGroup";

    getName(): string { return this.attribute.get("name"); }
    getRef(): string { return this.attribute.get("ref"); }


    private definition: Array<AttributeDefType>;

    getDefinition(): Array<AttributeDefType> {
        if (this.definition) return this.definition
        if (this.isSelfClosing && this.getRef()) {
            const ag = this.tree.NodeStorage.getXsAttributeGroupNode(this.getRef())
            if (ag) return this.definition = ag.getDefinition()
        } else if (!this.isSelfClosing() && this.getName()) {
            return this.definition = this.getChildren<XsAttributeNode>("xs:attribute")
                .map(attr => attr.getDefinition())
        }

        throw new Error("XsAttributeGroupNode.checks | there is a problem");
    }
}