import { AttributeDefType, ComplexDefType } from '../../types';
import { XsAttributeNode } from '../DeclarationComponents';
import { XsAttributeGroupNode, XsGroupNode } from '../GroupDefinitionComponents';
import { XsNode } from "../XsNode";
import { XsComplexContentNode, XsSequenceNode, XsSimpleContentNode } from '../misc';
import { TagType } from "../types";

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
        result.seqences = this.getChildren<XsSequenceNode>("xs:sequence").map(s => s.getDefinition())
        result.groups = this.getChildren<XsGroupNode>("xs:group").map(g => g.getDefinition())

        return (this.definition = result)
    }

}