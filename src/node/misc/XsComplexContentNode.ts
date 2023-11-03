import { ComplexContentDefType } from '../../types';
import { XsNode } from "../XsNode";
import { TagType } from "../types";
import { XsExtensionNode } from './XsExtensionNode';
import { XsRestrictionNode } from './XsRestrictionNode';

export class XsComplexContentNode extends XsNode {

    _tag: TagType = "xs:complexContent"


    private definition: ComplexContentDefType;

    getDefinition(): ComplexContentDefType {
        if (this.definition) return this.definition
        return this.definition = {
            restriction: this.getChildren<XsRestrictionNode>("xs:restriction")?.[0]?.getDefinition(),
            extension: this.getChildren<XsExtensionNode>("xs:extension")?.[0]?.getDefinition()
        }
    }
}