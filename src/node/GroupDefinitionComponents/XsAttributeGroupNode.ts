import { ITsDefinitionSchema } from "../../typescriptDefinitions";
import { XsNode } from "../XsNode";
import { TagType } from "../types";

export class XsAttributeGroupNode extends XsNode {
    _tag: TagType = "xs:attributeGroup";

    getName(): string { return this._attributes.get("name"); }
    getRef(): string { return this._attributes.get("ref"); }

    getTsSchema(): ITsDefinitionSchema {
        if (this.getName()) {


        } else if (this.getRef()) {

        }

        throw new Error("XsAttributeGroupNode.checks | there is a problem");
    }
}