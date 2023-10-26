import * as ts from "../../typescriptDefinitions";
import { XsNode } from "../XsNode";
import { TagType } from "../types";

export class XsListNode extends XsNode {
    _tag: TagType = "xs:list";

    itemType(): string { return this._attributes.get("itemType"); }


    getTsSchema(): ts.TsSchema {
        return ts.makeArrayType(this.itemType());
    }

}