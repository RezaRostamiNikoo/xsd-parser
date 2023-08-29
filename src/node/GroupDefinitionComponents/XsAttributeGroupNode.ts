import { ITsDefinitionSchema } from "../../typescriptDefinitions";
import { XsNode } from "../XsNode";

export class XsAttributeGroupNode extends XsNode {
    checks(): boolean {
        if (!this.hasChildren() || this.hasChildrenExcept("xs:attribute"))
            throw new Error("XsAttributeGroupNode.checks | it has a children except xs:attribute");
        return true;
    }


    getName(): string { return this.attributes.get("name"); }
    getRef(): string { return this.attributes.get("ref"); }

    getTsSchema(): ITsDefinitionSchema {
        if (this.getName()) {
            

        } else if (this.getRef()) {

        }

        throw new Error("XsAttributeGroupNode.checks | there is a problem");
    }
}