import * as ts from "../typescriptDefinitions";
import { XsNode } from "./XsNode";
import { TagType } from "./types";


export class XsChoiceNode extends XsNode {
    _tag: TagType = "xs:choice";

    checks(): boolean {
        if (this.hasChildrenExcept("xs:element"))
            throw new Error("XsChoiceNode.checks | the xs:choice should not have any children except element.");
        return true;
    }



    getTsSchema(): ts.TsSchema {
        return ts.makeUnionType(this.children.map((e) => e.Attributes.name));
    }




}