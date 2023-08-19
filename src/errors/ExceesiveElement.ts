import { XsNode } from "../node";
import { NodeName } from "../types";

export class ExcessiveElementsException extends Error {
    constructor(node: XsNode, elementType: NodeName) {
        super(`${node.name} element has exceesive ${elementType} element`)
    }
}