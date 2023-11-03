import { XsNode } from "../XsNode";
import { TagType } from "../types";
import { XsExtensionNode } from './XsExtensionNode';
import { SimpleContentDefType } from '../../types';

export class XsSimpleContentNode extends XsNode {
    _tag: TagType = "xs:simpleContent";

    private definition: SimpleContentDefType;

    getDefinition(): SimpleContentDefType {
        if (this.definition) return this.definition
        return this.definition = {
            extension: this.getChildren<XsExtensionNode>("xs:extension")[0].getDefinition()
        }
    }
}