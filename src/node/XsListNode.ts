import * as ts from "../typescriptDefinitions";
import { XsNode } from "./XsNode";
import { TagType } from "./types";

export class XsListNode extends XsNode {
    _tag: TagType = "xs:list";
    checks(): boolean {
        if (!this.itemType() && !this.hasChildren("xs:simpleType"))
            throw new Error("XsListNode.checks | should have itemtype or simpletype as children");
        return true;
    }

    itemType(): string { return this.attributes.get("itemType"); }


    getTsSchema(): ts.TsSchema {
        return ts.makeArrayType(this.itemType());
    }

}