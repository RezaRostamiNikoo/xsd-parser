import { ChoiceDefType } from '../../types';
import { XsElementNode } from '../DeclarationComponents';
import { XsNode } from "../XsNode";
import { TagType } from "../types";


export class XsChoiceNode extends XsNode {
    _tag: TagType = "xs:choice";

    private definition: ChoiceDefType;

    getDefinition(): ChoiceDefType {
        if (this.definition) return this.definition
        return this.definition = {
            elements: this.getChildren<XsElementNode>('xs:element')
                .map(e => ({ ...e.getDefinition(), optional: true }))
        }
    }

}