import * as ts from "../../typescriptDefinitions";
import { XsNode } from "../XsNode";

export class XsElementNode extends XsNode {
    checks(): boolean {
        throw new Error("Method not implemented.");
    }




    getTsSchema(): ts.TsSchema {
        return null;
    }
}