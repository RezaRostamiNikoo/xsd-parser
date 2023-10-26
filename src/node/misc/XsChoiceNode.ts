import * as ts from "../../typescriptDefinitions";
import { XsNode } from "../XsNode";
import { TagType } from "../types";


export class XsChoiceNode extends XsNode {
    _tag: TagType = "xs:choice";

    getTsSchema(): ts.TsSchema {
        return ts.makeUnionType(this._children.map((e) => e.attribute.get("name")));
    }

}