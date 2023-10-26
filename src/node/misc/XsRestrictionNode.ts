import { XsNode } from "../XsNode";
import { XsSimpleTypeNode } from "../TypeDefinitionComponents/XsSimpleTypeNode";
import * as ts from "../../typescriptDefinitions";
import { XsEnumerationNode } from "./XsEnumerationNode";
import { TagType } from "../types";

export class XsRestrictionNode extends XsNode {
    _tag: TagType = "xs:restriction";

    getTsSchema(): ts.TsSchema {
        if (!this.hasChildren())
            return ts.makeTypeReference(this._attributes.get("base")); // type reference
        if (this.hasChildren("xs:enumeration"))
            return ts.makeEnumItems(
                this.getChildren("xs:enumeration").map(e => (e as XsEnumerationNode).getValue())); // enum items
        if (this.hasChildren("xs:simpleType")) {
            const ss = this.firstChild<XsSimpleTypeNode>("xs:simpleType").getTsSchema();
            return ts.makeType((ss.definition as ts.TsTypeSchema).literal); // type literal
        }

        throw new Error("XsRestrictionNode.getTsSchema | there is a problem");
    }


}