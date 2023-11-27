import { XsNode } from "../XsNode";
import { TagType } from "../types";
import { XsExtensionNode } from './XsExtensionNode';
import { SimpleContentDefType } from '../../types';
import { Identifier, TypeNode } from 'typescript';
import { createIdentifier } from 'write-ts';
import { XsAttributeGroupNode } from '../GroupDefinitionComponents';
import { XsAttributeNode } from '../DeclarationComponents';

export class XsSimpleContentNode extends XsNode {
    _tag: TagType = "xs:simpleContent";

    private definition: SimpleContentDefType;

    getDefinition(): SimpleContentDefType {
        if (this.definition) return this.definition
        return this.definition = {
            extension: this.getChildren<XsExtensionNode>("xs:extension")[0].getDefinition()
        }
    }



    toTypeNodes(): { extendsion: Identifier, properties: Map<string, { optional: boolean, type: TypeNode }> } {
        const def = this.getDefinition()
        const ext = def.extension
        const properties: Map<string, { optional: boolean, type: TypeNode }> = new Map()

        if (def.extension?.attributes) {
            def.extension.attributes.forEach(attr => properties.set(attr.name, {
                optional: attr.optional,
                type: attr.type
            }))
        }

        return {
            extendsion: createIdentifier(ext.base),
            properties
        }
    }
}