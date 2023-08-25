import { XsNode } from "../node";
import { NodeName } from "../node/types";

export class ExcessiveElementsException extends Error {
    constructor(node: XsNode, elementType: NodeName) {
        super(`${node.Name} element has exceesive ${elementType} element`)
    }
}