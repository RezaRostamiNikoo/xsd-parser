import { XsNode } from "./XsNode";
import { XsSimpleTypeNode } from "./TypeDefinitionComponents/XsSimpleTypeNode";

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


}