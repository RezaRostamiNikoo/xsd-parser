import * as ts from "../typescriptDefinitions";
import { XsNode } from "./XsNode";

export class XsListNode extends XsNode {
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