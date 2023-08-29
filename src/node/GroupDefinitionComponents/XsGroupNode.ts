import * as ts from "../../typescriptDefinitions";
import { ITypeDefinition } from "../TypeDefinitionComponents/ITypeDefinition";
import { XsChoiceNode } from "../XsChoiceNode";
import { XsNode } from "../XsNode";
import { TagType } from "../types";

export class XsGroupNode extends XsNode {
    _tag: TagType = "xs:group";

    checks(): boolean {
        if (this.hasChildren() && this.hasChildrenExcept("xs:choice"))
            throw new Error("XsGroupNode.checks | xs:group should have just choice children ot it should not have any children");
        return true;
    }

    getTsSchema(): ts.TsSchema {
        if (!this.hasChildren() && this.attributes.get("ref"))
            return ts.makeTypeReference(this.attributes.get("ref"));
        if (!this.hasChildrenExcept("xs:choice") && this.getAttr("name")) {
            const choice: XsChoiceNode = this.firstChild("xs:choice");
            const tsdefinition = choice.getTsSchema();
            const df = tsdefinition.definition as ts.TsTypeUnionLiteral;
            return ts.makeUnionType(df.items, this.attributes.name);
        }
        throw new Error("XsGroupNode.toTsDefinition | Group has a ptoblem");
    }
}