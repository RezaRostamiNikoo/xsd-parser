import * as ts from "../../typescriptDefinitions";
import { ITypeDefinition } from "../TypeDefinitionComponents/ITypeDefinition";
import { XsChoiceNode } from "../XsChoiceNode";
import { XsNode } from "../XsNode";

export class XsGroupNode extends XsNode implements ITypeDefinition {

    checks(): boolean {
        if (this.hasChildren() && this.hasChildrenExcept("xs:choice"))
            throw new Error("XsGroupNode.checks | xs:group should have just choice children ot it should not have any children");
        return true;
    }



    get BaseTypeDefinition(): string {
        throw new Error("Method not implemented.");
    }
    get TypeParent(): ITypeDefinition {
        throw new Error("Method not implemented.");
    }
    variety(): "atomic" | "list" | "union" {
        throw new Error("Method not implemented.");
    }
    toTsDefinition(): ts.TsSchema {
        if (!this.hasChildren() && this.attributes.get("ref"))
            return ts.makeTypeReference(this.attributes.get("ref"));
        if (!this.hasChildrenExcept("xs:choice") && this.Name) {
            const choice: XsChoiceNode = this.firstChild("xs:choice");
            const tsdefinition = choice.getTsSchema();
            const df = tsdefinition.definition as ts.TsTypeUnionLiteral;
            return ts.makeUnionType(df.items, this.Name);
        }
        throw new Error("XsGroupNode.toTsDefinition | Group has a ptoblem");
    }
}