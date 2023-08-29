import * as ts from "../../typescriptDefinitions";
import { XsNode } from "../XsNode";
import { TagType } from "../types";

export class XsElementNode extends XsNode {
    _tag: TagType = "xs:element";
    checks(): boolean {
        throw new Error("Method not implemented.");
    }




    getTsSchema(): ts.TsSchema {
        return null;
    }
}