import { XsNode } from "../node";
import { TagType } from "../node/types";

export class ExcessiveElementsException extends Error {
    constructor(node: XsNode, elementType: TagType) {
        super(`${node.Tag} element has exceesive ${elementType} element`)
    }
}