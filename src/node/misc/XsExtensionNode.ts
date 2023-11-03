import { AttributeDefType, ExtensionDefType } from '../../types';
import { XsAttributeNode } from '../DeclarationComponents';
import { XsAttributeGroupNode } from '../GroupDefinitionComponents';
import { XsNode } from "../XsNode";
import { TagType } from "../types";
import { XsChoiceNode } from './XsChoiceNode';
import { XsSequenceNode } from './XsSequenceNode';

export class XsExtensionNode extends XsNode {
    _tag: TagType = "xs:extension";

    private getAttributeDefs(): Array<AttributeDefType> {
        const result = this.getChildren<XsAttributeGroupNode>("xs:attributeGroup").flatMap(ag => ag.getDefinition())
        result.push(...this.getChildren<XsAttributeNode>('xs:attribute').map(an => an.getDefinition()))
        return result
    }


    private definition: ExtensionDefType

    getDefinition(): ExtensionDefType {
        if (this.definition) return this.definition
        const result: ExtensionDefType = {
            base: this.attribute.get('base')
        }
        if (this.isSelfClosing()) return this.definition = result

        result.elements = this.getChildren<XsChoiceNode>("xs:choice")
            .flatMap(s => s.getDefinition().elements.map(e => ({ optional: true, element: e })))

        result.elements = this.getChildren<XsSequenceNode>("xs:sequence")
            .flatMap(s => s.getDefinition().elements.map(e => ({ optional: false, element: e })))

        result.attributes = this.getAttributeDefs()

        return this.definition = result

    }
}