import { XsChoiceNode } from "../misc/XsChoiceNode";
import { XsNode } from "../XsNode";
import { TagType } from "../types";
import { GroupDefType } from '../../types';
import { TypeNode, TypeReferenceNode } from 'typescript';
import { createTypeReferenceNode, createUnionTypeNode } from 'write-ts';

export class XsGroupNode extends XsNode {
    _tag: TagType = "xs:group";

    private definition: GroupDefType;

    getDefinition(): GroupDefType {
        if (this.definition) return this.definition
        if (!this.hasChildren() && this.attribute.get("ref")) {
            return this.definition = { ref: this.attribute.get("ref") }
        }
        if (!this.hasChildrenExcept("xs:choice") && this.attribute.name) {
            return this.definition = {
                name: this.attribute.name,
                choices: this.firstChild<XsChoiceNode>("xs:choice").getDefinition()
            }
        }
        throw new Error("XsGroupNode.toTsDefinition | Group has a ptoblem");
    }

    toTypeNode(): TypeNode {
        const def = this.getDefinition()
        if (def.ref) return createTypeReferenceNode(def.ref)
        const unions: TypeReferenceNode[] = []
        def.choices?.elements?.forEach(e => {
            if (e.complexType) {
                // unions.push(this.complexDefToLiteral())
            }
            else unions.push(createTypeReferenceNode(e.primitiveType || e.type))
        })
        return createUnionTypeNode(...unions)
    }
}