import { ClassGenerator, IntersectionTypeGenerator, TypeLiteralGenerator, createIdentifier, createTypeReferenceNode } from 'write-ts';
import { AttributeDefType, ComplexDefType } from '../../types';
import { XsAttributeNode } from '../DeclarationComponents';
import { XsAttributeGroupNode, XsGroupNode } from '../GroupDefinitionComponents';
import { XsNode } from "../XsNode";
import { XsComplexContentNode, XsSequenceNode, XsSimpleContentNode } from '../misc';
import { TagType } from "../types";
import { TypeNode } from 'typescript';

export class XsComplexTypeNode extends XsNode {
    _tag: TagType = "xs:complexType";

    getAttributeDefs(): Array<AttributeDefType> {
        const result = this.getChildren<XsAttributeGroupNode>("xs:attributeGroup").flatMap(ag => ag.getDefinition())
        result.push(...this.getChildren<XsAttributeNode>('xs:attribute').map(an => an.getDefinition()))
        return result
    }

    private definition: ComplexDefType;

    getDefinition(): ComplexDefType {
        if (this.definition) return this.definition
        const result: ComplexDefType = {}

        result.identifier = this.attribute.name


        result.attributes = this.getAttributeDefs()
        result.complexContent = this.getChildren<XsComplexContentNode>("xs:complexContent")?.[0]?.getDefinition()
        result.simpleContent = this.getChildren<XsSimpleContentNode>("xs:simpleContent")?.[0]?.getDefinition()
        result.sequences = this.getChildren<XsSequenceNode>("xs:sequence").map(s => s.getDefinition())
        result.groups = this.getChildren<XsGroupNode>("xs:group").map(g => g.getDefinition())

        return (this.definition = result)
    }

    toTypeNode(): TypeNode {
        const def = this.getDefinition()
        const result = new TypeLiteralGenerator()
        let extension;

        def.attributes?.forEach(attr => result.addProperty(attr.name, attr.type, attr.optional))
        def.groups?.forEach(g => result.addProperty(g.name, g.type))
        def.sequences?.forEach(s => {
            s.elements.forEach(e => result.addProperty(e.name, e.type, e.optional))
        })

        if (def.simpleContent?.extension) {
            const sce = def.simpleContent.extension
            sce.attributes?.forEach(attr => result.addProperty(attr.name, attr.type, attr.optional))
            sce.elements?.forEach(e => result.addProperty(e.name, e.type, e.optional))
            extension = createTypeReferenceNode(sce.base)
        }

        if (def.complexContent?.extension) {
            const cce = def.complexContent.extension
            cce.attributes?.forEach(attr => result.addProperty(attr.name, attr.type, attr.optional))
            cce.elements?.forEach(e => result.addProperty(e.name, e.type, e.optional))
            extension = createTypeReferenceNode(cce.base)
        }

        if (def.complexContent?.restriction) {
            const rest = def.complexContent?.restriction
            result.addProperty(rest.identifier, rest.type)
        }

        return extension
            ? new IntersectionTypeGenerator().addType(result.generate()).addType(extension).generate()
            : result.generate()
    }

    toClass(): ClassGenerator {

        const def = this.getDefinition()

        const result = new ClassGenerator(this.attribute.name)
        result.Modifiers.export()

        def.attributes?.forEach(attr =>
            result.addProperty(attr.name).setType(attr.type).optional(attr.optional))
        def.groups?.forEach(g => result.addProperty(g.name).setType(g.type))
        def.sequences?.forEach(s => {
            s.elements.forEach(e => result.addProperty(e.name).setType(e.type).optional(e.optional))
        })

        if (def.simpleContent?.extension) {
            const sce = def.simpleContent.extension
            sce.attributes?.forEach(attr => result.addProperty(attr.name).setType(attr.type).optional(attr.optional))
            sce.elements?.forEach(e => result.addProperty(e.name).setType(e.type).optional(e.optional))
            result.extends(createIdentifier(sce.base))
        }

        if (def.complexContent?.extension) {
            const cce = def.complexContent.extension
            cce.attributes?.forEach(attr => result.addProperty(attr.name).setType(attr.type).optional(attr.optional))
            cce.elements?.forEach(e => result.addProperty(e.name).setType(e.type).optional(e.optional))
            result.extends(createIdentifier(cce.base))
        }


        return result
    }

}