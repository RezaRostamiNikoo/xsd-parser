import { XsNode } from "./XsNode";

export class XsEnumerationNode extends XsNode {


    getValue(): string {
        return this.attributes.get("value");
    }

}