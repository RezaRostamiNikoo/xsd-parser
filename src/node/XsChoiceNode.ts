import * as ts from "../typescriptDefinitions";
import { XsElementNode } from "./DeclarationComponents";
import { ITypeDefinition } from "./TypeDefinitionComponents/ITypeDefinition";
import { XsNode } from "./XsNode";


export class XsChoiceNode extends XsNode {

    checks(): boolean {
        if (this.hasChildrenExcept("xs:element"))
            throw new Error("XsChoiceNode.checks | the xs:choice should not have any children except element.");
        return true;
    }

    getTsSchema(): ts.TsSchema {
        return ts.makeUnionType(this.children.map((e) => e.Name));
    }




}