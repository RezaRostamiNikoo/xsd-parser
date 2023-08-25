import { TsDefinition } from "../../TsDefinitions";
import { ITypeDefinition } from "../TypeDefinitionComponents/ITypeDefinition";
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
    toTsDefinition(): TsDefinition {
        throw new Error("Method not implemented.");
    }
}