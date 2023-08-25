import { TsDefinition } from "../../TsDefinitions";
import { ExcessiveElementsException } from "../../errors";
import { OnlyException } from "../../errors/OnlyException";
import { XsEnumerationNode } from "../XsEnumerationNode";
import { XsListNode } from "../XsListNode";
import { XsNode } from "../XsNode";
import { XsRestrictionNode } from "../XsRestrictionNode";
import { ITypeDefinition } from "./ITypeDefinition";

export class XsSimpleTypeNode extends XsNode implements ITypeDefinition {
    get TypeParent(): ITypeDefinition {
        throw new Error("Method not implemented.");
    }
    get BaseTypeDefinition(): string { return this.baseTypeDefinition(); }

    checks(): boolean {
        // it it has not any children
        if (this.hasChildren() < 1)
            throw Error("XsSimpleTypeNode.toTsDefinition | xs:simpleType should have at least one children")
        if (this.hasChildren("xs:list") + this.hasChildren("xs:union") + this.hasChildren("xs:restriction") > 1)
            throw new OnlyException(this, ["xs:restriction", "xs:union", "xs:list"])
        return true;
    }

    variety(): "atomic" | "list" | "union" {
        if (this.hasChildren("xs:list") === 1) return "list";
        if (this.hasChildren("xs:union") === 1) return "union";
        // TODO: check the veriety type of the restriction
        if (this.hasChildren("xs:restriction")) {
            const type = this.baseTypeDefinition();
            if (!type)
                throw new Error("XsSimpleType.Variety | it should be handled");
            const definition = XsNode.types.get(type);
            if (!definition)
                throw new Error("XsSimpleType.Variety | it should be handled");
            return definition.variety();
        }
        throw new Error("XsSimpleType.Variety | it should be handled");
    }


    baseTypeDefinition(): string {
        if (this.hasChildren("xs:restriction"))
            return (this.firstChild("xs:restriction") as XsRestrictionNode).baseTypeDefinition()
        if (this.hasChildren("xs:list"))
            return (this.firstChild("xs:list") as XsListNode).itemType();
        if (this.hasChildren("xs:union"))
            throw new Error("XsSimpleTypeNode.baseTypeDefinition | it should be defined for union");
    }



    rules(): Array<"Rule1" | "Rule2" | "Rule3" | "Rule4"> {
        if (this.hasChildren("xs:restriction") && this.variety() === "atomic")
            return ["Rule1", "Rule2"];
        if (this.hasChildren("xs:list") || this.hasChildren("xs:restriction") && this.variety() === "list")
            return ["Rule1", "Rule3"];
        if (this.hasChildren("xs:union") || this.hasChildren("xs:restriction") && this.variety() === "union")
            return ["Rule1", "Rule4"];

        throw new Error("XsSimpleTypeNode.rules | check the function");
    }

    restrictionWise(): boolean { return this.hasChildren("xs:restriction") === 1; }
    listWise(): boolean { return this.hasChildren("xs:list") === 1; }
    unionWise(): boolean { return this.hasChildren("xs:union") === 1; }


    toTsDefinition(): TsDefinition {
        if (this.restrictionWise()) {
            const restrictionNode: XsRestrictionNode = this.firstChild("xs:restriction") as XsRestrictionNode;

            if (restrictionNode.areAllChildren("xs:enumeration")) {
                // TODO: return a json fixed for this condition
                return TsDefinition.makeEnum(
                    this.Name,
                    restrictionNode.Children.map((c: XsEnumerationNode) => { return c.getValue() }));
            }
            if (!restrictionNode.hasChildren() || this.variety() === "atomic")
                return TsDefinition.makeSimpleType(this.BaseTypeDefinition, this.Name);
            else if (this.variety() === "list") {
                const list = this.firstChild() as XsListNode;
                return TsDefinition.makeArrayType(this.BaseTypeDefinition, this.Name);
            }
            else if (this.variety() === "union")
                throw new Error("XsSimpleTypeNode.toTsDefinition | it should be defined in restrictionWise()");
            else
                throw new Error("XsSimpleTypeNode.toTsDefinition | it should be defined in restrictionWise()");

        }

        if (!this.Name) {
            if (this.listWise()) {
                return TsDefinition.makeArrayType(this.BaseTypeDefinition, this.Name);
            }
        }
        if (this.Name) {
            if (this.listWise()) {
                const list = this.firstChild() as XsListNode;
                return TsDefinition.makeArrayType(list.itemType(), this.Name);
            }
        }

        else if (this.listWise()) return TsDefinition.makeArrayType(this.BaseTypeDefinition);
        else if (this.unionWise()) throw new Error("XsSimpleTypeNode.toTsDefinition | it should be defined");
    }
}