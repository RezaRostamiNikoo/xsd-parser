import * as ts from "../../typescriptDefinitions";
import { XsChoiceNode } from "../misc/XsChoiceNode";
import { XsNode } from "../XsNode";
import { TagType } from "../types";

export class XsGroupNode extends XsNode {
    _tag: TagType = "xs:group";

    getTsSchema(): ts.TsSchema {
        if (!this.hasChildren() && this._attributes.get("ref"))
            return ts.makeTypeReference(this._attributes.get("ref"));
        if (!this.hasChildrenExcept("xs:choice") && this.getAttr("name")) {
            const choice: XsChoiceNode = this.firstChild("xs:choice");
            const tsdefinition = choice.getTsSchema();
            const df = tsdefinition.definition as ts.TsTypeUnionLiteral;
            return ts.makeUnionType(df.items, this._attributes.get("name"));
        }
        throw new Error("XsGroupNode.toTsDefinition | Group has a ptoblem");
    }
}