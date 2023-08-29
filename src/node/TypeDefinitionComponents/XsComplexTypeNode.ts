import { XsNode } from "../XsNode";
import { TagType } from "../types";

export class XsComplexTypeNode extends XsNode {
    _tag: TagType = "xs:complexType";
    checks(): boolean {
        throw new Error("Method not implemented.");
    }

}