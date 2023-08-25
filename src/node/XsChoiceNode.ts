import { TsDefinition } from "../TsDefinitions";
import { XsElementNode } from "./DeclarationComponents";
import { ITypeDefinition } from "./TypeDefinitionComponents/ITypeDefinition";
import { XsNode } from "./XsNode";


export class XsChoiceNode extends XsNode implements ITypeDefinition {

    checks(): boolean {
        if (this.hasChildrenExcept("xs:element"))
            throw new Error("XsChoiceNode.checks | the xs:choice should not have any children except element.");
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
        
        return TsDefinition.makeUnionType(this.children.map((e) => e.Name));
    }




}