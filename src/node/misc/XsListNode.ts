import { normalizingName } from '../../utils';
import { XsNode } from "../XsNode";
import { TagType } from "../types";

export class XsListNode extends XsNode {

    _tag: TagType = "xs:list";

    itemType(): string { return this.attribute.get("itemType") }

}