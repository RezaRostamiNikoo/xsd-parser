import * as ts from "../../typescriptDefinitions";
import { XsListNode } from "../misc/XsListNode";
import { XsNode } from "../XsNode";
import { XsRestrictionNode } from "../misc/XsRestrictionNode";
import { TagType } from "../types";

export class XsSimpleTypeNode extends XsNode {
    _tag: TagType = "xs:simpleType";

    restrictionWise(): boolean { return this.hasChildren("xs:restriction") === 1; }
    listWise(): boolean { return this.hasChildren("xs:list") === 1; }
    unionWise(): boolean { return this.hasChildren("xs:union") === 1; }

    getTsSchema(): ts.TsSchema {
        if (this.hasChildren("xs:list")) {
            const ls = this.firstChild<XsListNode>("xs:list").getTsSchema()
            if (ls.type === "type" && (ls.definition as ts.TsTypeSchema).usage === "literal")
                return ts.makeType((ls.definition as ts.TsTypeSchema).literal, this.attribute.name); // type literal
        }
        if (this.hasChildren("xs:restriction")) {
            const rs = this.firstChild<XsRestrictionNode>("xs:restriction").getTsSchema();
            if (this.attribute.name) {
                if (rs.type === "enum" && (rs.definition as ts.TsEnumSchema).usage === "items")
                    return ts.makeEnumDefinition(this.attribute.name, (rs.definition as ts.TsEnumSchema).items);// enum definition
                if (rs.type === "reference")
                    return ts.makeSimpleType((rs.definition as ts.TsTypeReferenceSchema).reference, this.attribute.name); // type definition
                if (rs.type === "type" && (rs.definition as ts.TsTypeSchema).usage === "literal")
                    return ts.makeType((rs.definition as ts.TsTypeSchema).literal, this.attribute.name); // type definition
            } else if (rs.type === "type" && (rs.definition as ts.TsTypeSchema).usage === "literal") {
                return ts.makeType((rs.definition as ts.TsTypeSchema).literal); // type literal
            }
        }
        throw new Error(`XsSimpleTypeNode.getTsSchema | there is a problem\n\n${this.toXml()}`);
    }
}