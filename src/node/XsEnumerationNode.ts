import { XsNode } from "./XsNode";
import { TagType } from "./types";

export class XsEnumerationNode extends XsNode {
    _tag: TagType = "xs:enumeration";
    checks(): boolean {
        return true;
    }


    getValue(): string {
        return this.attributes.get("value");
    }

}