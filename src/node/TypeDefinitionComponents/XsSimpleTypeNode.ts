import { XsListNode } from "../misc/XsListNode";
import { XsNode } from "../XsNode";
import { XsRestrictionNode } from "../misc/XsRestrictionNode";
import { TagType } from "../types";
import { SimpleDefType } from '../../types';
import { ClassGenerator, EnumGenerator, TypeLiteralGenerator, createArrayTypeNode, createTypeReferenceNode } from 'write-ts';
import { TypeNode } from 'typescript';

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

    private definition: SimpleDefType;

    getDefinition(): SimpleDefType {
        if (this.definition) return this.definition

        if (this.attribute.name) {
            if (this.list_Wise()) {
                return (this.definition = {
                    defType: "arrayType",
                    identifier: this.attribute.name,
                    type: createArrayTypeNode(createTypeReferenceNode(this.firstChild<XsListNode>("xs:list").itemType()))
                })
            } else if (this.restriction_Wise()) {
                return (this.definition = {
                    identifier: this.attribute.name,
                    ...this.firstChild<XsRestrictionNode>("xs:restriction").getDefinition()
                })
            }
        } else {
            if (this.list_Wise()) {
                return (this.definition = {
                    defType: "arrayType",
                    type: createArrayTypeNode(createTypeReferenceNode(this.firstChild<XsListNode>("xs:list").itemType()))
                })
            } else if (this.restriction_Wise()) {
                return (this.definition = this.firstChild<XsRestrictionNode>("xs:restriction").getDefinition())
            }
        }

        throw new Error(`XsSimpleTypeNode.getTsSchema | there is a problem\n\n${this.toXml()}`);
    }

    toTypeNode(): TypeNode {
        const def = this.getDefinition()
        if (def.defType === "enum" || def.identifier) throw new Error("Converter.simpleDefToLiteral | proble")
        const lt = new TypeLiteralGenerator()
        if (def.defType === "arrayType")
            lt.addProperty('_simple_value', createArrayTypeNode(def.type))
        else
            lt.addProperty('_simple_value', def.type)

        return lt.generate()
    }

    toClass(): ClassGenerator {
        const def = this.getDefinition()
        if (def.defType === "enum" || !def.identifier) throw new Error("Converter.simpleDefToClass | proble")
        const result = new ClassGenerator(def.identifier)
        result.Modifiers.export()
        const p = result.addProperty('_simple_value')
        if (def.defType === "arrayType")
            p.setType(createArrayTypeNode(def.type))
        else p.setType(def.type)
        return result
    }

    toEnum(): EnumGenerator {
        const def = this.getDefinition()
        if (def.defType !== "enum" || !def.identifier) throw new Error("Converter.simpleDefToEnum | proble")
        const result = new EnumGenerator(def.identifier)
        result.Modifiers.export()
        def.enumItems.forEach(e => result.addMember(e.toUpperCase()))
        return result
    }
}