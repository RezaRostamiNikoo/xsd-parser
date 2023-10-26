import * as ts from "../../typescriptDefinitions";
import { XsElementNode } from "../DeclarationComponents";
import { XsNode } from "../XsNode";
import { TagType } from "../types";


export class XsSequenceNode extends XsNode {
    _tag: TagType = "xs:sequence";

    getTsSchemaArray(): Array<ts.TsSchema> | undefined {
        if (!this.hasChildren()) return undefined;
        return this._children.map((element: XsElementNode) => element.getTsSchema());
    }

}