import { XsNode } from "../XsNode";
import { TagType } from "../types";

export class XsEnumerationNode extends XsNode {
    _tag: TagType = "xs:enumeration";

    getValue(): string {
        return this._attributes.get("value");
    }

}