import { ExcessiveElementsException } from "../../errors";
import { OnlyException } from "../../errors/OnlyException";
import { BaseTypeDefinition } from "../../schema/baseType";
import { XsEnumerationNode } from "../XsEnumerationNode";
import { XsNode } from "../XsNode";
import { XsRestrictionNode } from "../XsRestrictionNode";

export class XsSimpleTypeNode extends XsNode {

    checks(): boolean {
        // it it has not any children
        if (this.hasChildren() < 1)
            throw Error("XsSimpleTypeNode.toTsDefinition | xs:simpleType should have at least one children")
        if (this.hasChildren("xs:list") + this.hasChildren("xs:union") + this.hasChildren("xs:restriction") > 1)
            throw new OnlyException(this, ["xs:restriction", "xs:union", "xs:list"])
        if (this.hasChildren("xs:restriction") > 1)
            throw new ExcessiveElementsException(this, "xs:restriction");
        if (this.hasChildren("xs:list") > 1)
            throw new ExcessiveElementsException(this, "xs:list");
        if (this.hasChildren("xs:union") > 1)
            throw new ExcessiveElementsException(this, "xs:union");
        return true;
    }

    variety(): "atomic" | "list" | "union" {
        if (this.hasChildren("xs:list") === 1) return "list";
        if (this.hasChildren("xs:union") === 1) return "union";
        // TODO: check the veriety type of the restriction  
        // if (this.hasChildren("xs:restriction")) return this.baseType();

        throw new Error("XsSimpleType.Variety | it should be handled");
    }


    baseTypeDefinition(): BaseTypeDefinition {
        if (this.hasChildren("xs:restriction"))
            return (this.firstChild("xs:restriction") as XsRestrictionNode).baseTypeDefinition()
        if (this.hasChildren("xs:list")) return new BaseTypeDefinition("xs:anySimpleType");
        if (this.hasChildren("xs:union")) return new BaseTypeDefinition("xs:anySimpleType");
    }



    rule(): Array<"Rule1" | "Rule2" | "Rule3" | "Rule4"> {
        if (this.hasChildren("xs:restriction") && this.baseTypeDefinition().Veriety === "atomic")
            return ["Rule1", "Rule2"];
        if (this.hasChildren("xs:list") || this.hasChildren("xs:restriction") && this.baseTypeDefinition().Veriety === "list")
            return ["Rule1", "Rule3"];
        if (this.hasChildren("xs:union") || this.hasChildren("xs:restriction") && this.baseTypeDefinition().Veriety === "union")
            return ["Rule1", "Rule4"];
    }




    toTsDefinition(): Object {
        const result = {};

        // if it has no any children
        if (this.hasChildren("xs:restriction")) {
            const rn: XsRestrictionNode = this.children[0] as XsRestrictionNode;

            if (rn.areAllChildren("xs:enumeration")) {
                // TODO: return a json fixed for this condition
                return {
                    type: "enum",
                    items: rn.Children.map((c: XsEnumerationNode) => { return c.getValue() })
                }
            }

        }

        return result;
    }
}