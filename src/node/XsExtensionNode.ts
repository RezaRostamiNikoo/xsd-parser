import { ITsSchema } from "../typescriptDefinitions";
import { XsNode } from "./XsNode";
import { TagType } from "./types";

export class XsExtensionNode extends XsNode {
    _tag: TagType = "xs:extension";

    checks(): boolean {
        if (!this.hasChildren())
            throw new Error("XsExtensionNode.checks | Method not implemented.");
        return true;
    }


    getTsSchema(): ITsSchema {


        return null;
    }
}