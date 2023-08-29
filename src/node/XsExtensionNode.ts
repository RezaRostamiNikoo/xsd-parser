import { ITsSchema } from "../typescriptDefinitions";
import { XsNode } from "./XsNode";

export class XsExtensionNode extends XsNode {
    checks(): boolean {
        if (!this.hasChildren())
            throw new Error("XsExtensionNode.checks | Method not implemented.");
        return true;
    }


    getTsSchema(): ITsSchema {

    }
}