import { XsChoiceNode } from "../misc/XsChoiceNode";
import { XsNode } from "../XsNode";
import { TagType } from "../types";
import { GroupDefType } from '../../types';
import { TypeNode, TypeReferenceNode } from 'typescript';
import { createArrayTypeNode, createTypeReferenceNode, createUnionTypeNode } from 'write-ts';

export class XsGroupNode extends XsNode {
    _tag: TagType = "xs:group";

    private definition: GroupDefType;


    isArray(): boolean {
        const maxOccurs = this.attribute.get('maxOccurs')
        return maxOccurs === "unbounded" || maxOccurs > "1"
    }

    convertToArray(type: TypeNode): TypeNode {
        if (this.isArray()) return createArrayTypeNode(type)
        return type
    }

    getDefinition(): GroupDefType {
        if (this.definition) return this.definition
        if (!this.hasChildren() && this.attribute.get("ref")) {
            return this.definition = {
                name: '_value',
                type: this.convertToArray(createTypeReferenceNode(this.attribute.get("ref")))
            }
        }
        if (!this.hasChildrenExcept("xs:choice") && this.attribute.name) {
            return this.definition = {
                name: this.attribute.name,
                type: createUnionTypeNode(...this.firstChild<XsChoiceNode>("xs:choice").getDefinition()
                    .elements.map(e => e.type)
                )
            }
        }
        throw new Error("XsGroupNode.toTsDefinition | Group has a ptoblem");
    }
}