import { XsListNode } from "../misc/XsListNode";
import { XsNode } from "../XsNode";
import { XsRestrictionNode } from "../misc/XsRestrictionNode";
import { TagType } from "../types";
import { TsSchema, TsTypeSchema, makeArrayType, makeEnumDefinition, makeSimpleType, makeType } from '../../typescriptDefinitions';
import { TypeGenerator, createArrayTypeNode, createIdentifier, createTypeReferenceNode } from 'write-ts';
import * as ts from 'typescript';
import { TsType } from '../../types';

export class XsSimpleTypeNode extends XsNode {
    _tag: TagType = "xs:simpleType";

    restriction_Wise(): boolean {
        if (!this.hasChildren("xs:restriction")) return false
        if (this.hasChildrenExcept("xs:restriction")) throw new Error(`XsSimpleTypeNode.restrictionWise | it should not have any child except "xs:restrixtion"\n${this.toXml()}`)
        return true
    }

    /** returns true if this node has only list */
    list_Wise(): boolean {
        if (!this.hasChildren("xs:list")) return false
        if (this.hasChildrenExcept("xs:list")) throw new Error(`XsSimpleTypeNode.listwise | it should not have any child except "xs:list"\n${this.toXml()}`)
        return true
    }

    union_Wise(): boolean {
        if (!this.hasChildren("xs:union")) return false
        if (this.hasChildrenExcept("xs:union")) throw new Error(`XsSimpleTypeNode.restrictionWise | it should not have any child except "xs:union"\n${this.toXml()}`)
        return true
    }

    getTsType(): TsType {
        if (this.attribute.name) {
            if (this.list_Wise()) {
                return {
                    type: "arrayType",
                    identifier: this.attribute.name,
                    itemType: this.firstChild<XsListNode>("xs:list").itemType()
                }
            } else if (this.restriction_Wise()) {
                return {
                    identifier: this.attribute.name,
                    ...this.firstChild<XsRestrictionNode>("xs:restriction").getTsType()
                }
            }
        } else {
            if (this.list_Wise()) {
                return {
                    type: "arrayType",
                    itemType: this.firstChild<XsListNode>("xs:list").itemType()
                }
            } else if (this.restriction_Wise()) {
                return this.firstChild<XsRestrictionNode>("xs:restriction").getTsType()
            }
        }

        throw new Error(`XsSimpleTypeNode.getTsSchema | there is a problem\n\n${this.toXml()}`);
    }
}