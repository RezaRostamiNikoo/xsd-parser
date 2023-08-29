import * as ts from "../typescriptDefinitions";
import { XsElementNode } from "./DeclarationComponents";
import { XsNode } from "./XsNode";
import { TagType } from "./types";


export class XsSequenceNode extends XsNode {
    _tag: TagType = "xs:sequence";

    checks(): boolean {
        if (this.hasChildrenExcept("xs:element"))
            throw new Error("XsSequence.checks | xs:sequence should only have element children");
        return true;
    }

    getTsSchemaArray(): Array<ts.TsSchema> | undefined {
        if (!this.hasChildren()) return undefined;
        return this.children.map((element: XsElementNode) => element.getTsSchema());
    }

}