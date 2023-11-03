import { ElementDefType } from '../../types';
import { XsComplexTypeNode } from '../TypeDefinitionComponents';
import { XsNode } from "../XsNode";
import { TagType } from "../types";

export class XsElementNode extends XsNode {
    _tag: TagType = "xs:element";

    private definition: ElementDefType;

    getDefinition(): ElementDefType {
        if (this.definition) return this.definition
        if (this.isSelfClosing() && this.attribute.ref) {
            return this.definition = this.tree.NodeStorage.getXsElementNode(this.attribute.ref)?.getDefinition()
        }

        if (this.isSelfClosing() && this.attribute.name) {
            return this.definition = {
                name: this.attribute.name,
                type: this.attribute.get('type'),
                primitiveType: this.tree.NodeStorage.getPrimitive(this.attribute.get('type'))?.itemType
            }
        }

        if (this.hasChildren("xs:complexType"))
            return this.definition = {
                name: this.attribute.name,
                complexType: this.firstChild<XsComplexTypeNode>("xs:complexType").getDefinition()
            }

        throw new Error('XsElementNode.getDefinition | there is a problem')
    }
}