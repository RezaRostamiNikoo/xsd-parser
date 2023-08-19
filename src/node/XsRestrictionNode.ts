import { BaseTypeDefinition } from "../schema/baseType";
import { XsNode } from "./XsNode";
import { XsSimpleTypeNode } from "./TypeDefinitionComponents/XsSimpleTypeNode";

export class XsRestrictionNode extends XsNode {


    baseTypeDefinition(): BaseTypeDefinition {
        const result = new BaseTypeDefinition(this.attributes.get("base")) ||
            this.firstChild<XsSimpleTypeNode>("xs:simpleType").baseTypeDefinition();

        if (result) return result;
        throw new Error("XsRestrictionNode.baseTypeDefinition() | it doesn't have baseType");

    }


}