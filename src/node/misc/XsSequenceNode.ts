import { SequenceDefType } from '../../types';
import { XsElementNode } from "../DeclarationComponents";
import { XsNode } from "../XsNode";
import { TagType } from "../types";


export class XsSequenceNode extends XsNode {
    _tag: TagType = "xs:sequence";


    private definition: SequenceDefType;

    getDefinition(): SequenceDefType {
        if (this.definition) return this.definition
        if (!this.hasChildren()) return undefined
        return this.definition = {
            elements: this.getChildren<XsElementNode>('xs:element')
                .map((e: XsElementNode) => e.getDefinition())
        }
    }

}