import { XsNode } from "./XsNode";

export class XsEnumerationNode extends XsNode {
    checks(): boolean {
        return true;
    }


    getValue(): string {
        return this.attributes.get("value");
    }

}