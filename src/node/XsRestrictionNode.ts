import { XsNode } from "./XsNode";
import { XsSimpleTypeNode } from "./TypeDefinitionComponents/XsSimpleTypeNode";
import * as ts from "../typescriptDefinitions";
import { XsEnumerationNode } from "./XsEnumerationNode";

export class XsRestrictionNode extends XsNode {

    checks(): boolean {
        throw new Error("XsRestrictionNode.checks | Method not implemented.");
    }


    baseTypeDefinition(): string {
        const result = this.attributes.get("base")
        this.firstChild<XsSimpleTypeNode>("xs:simpleType").baseTypeDefinition();

        if (result) return result;
        throw new Error("XsRestrictionNode.baseTypeDefinition() | it doesn't have baseType");

    }

    getTsSchema(): ts.TsSchema {
        if (!this.hasChildren())
            return ts.makeSimpleType(this.attributes.get("base"));
        if (this.hasChildren("xs:enumeration"))
            return ts.makeEnumItems(
                this.Children("xs:enumeration").map(e => (e as XsEnumerationNode).getValue()));

        if (this.hasChildren("xs:simpleType"))
            return this.firstChild<XsSimpleTypeNode>("xs:simpleType").getTsSchema();

        throw new Error("XsRestrictionNode.getTsSchema | there is a problem");
    }


}