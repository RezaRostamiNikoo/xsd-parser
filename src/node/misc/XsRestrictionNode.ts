import { XsNode } from "../XsNode";
import { XsSimpleTypeNode } from "../TypeDefinitionComponents/XsSimpleTypeNode";
import { XsEnumerationNode } from "./XsEnumerationNode";
import { TagType } from "../types";
import { RestrictionDefType } from '../../types';
import { createTypeReferenceNode } from 'write-ts';

export class XsRestrictionNode extends XsNode {
    _tag: TagType = "xs:restriction";


    getBase(): string { return this.attribute.get('base') }

    isEnum(): boolean {
        if (!this.hasChildren("xs:enumeration")) return false
        if (this.hasChildrenExcept("xs:enumeration")) throw new Error(`XsRestrictionNode.isEnum | it should not have any child except "xs:enumeration"\n${this.toXml()}`)
        return true
    }
    isSimpleType(): boolean {
        if (!this.hasChildren("xs:simpleType")) return false
        if (this.hasChildrenExcept("xs:simpleType")) throw new Error(`XsRestrictionNode.isSimpleType | it should not have any child except "xs:simpleType"\n${this.toXml()}`)
        return true
    }

    getEnumItems(): Array<string> {
        return this.getChildren("xs:enumeration").map(e => (e as XsEnumerationNode).getValue())
    }

    private definition: RestrictionDefType;

    getDefinition(): RestrictionDefType {
        if (this.definition) return this.definition
        if (this.isSelfClosing() || this.hasChildren("xs:sequence"))
            return this.definition = {
                defType: "type",
                type: createTypeReferenceNode(this.attribute.get("base"))
            }
        if (this.isEnum())
            return this.definition = {
                defType: "enum",
                enumItems: this.getChildren("xs:enumeration").map(e => (e as XsEnumerationNode).getValue())
            }
        if (this.isSimpleType()) {
            return this.definition = this.firstChild<XsSimpleTypeNode>("xs:simpleType").getDefinition()
        }

        throw new Error("XsRestrictionNode.getTsSchema | there is a problem");
    }


}