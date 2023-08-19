import { XsNode } from "../node";
import { NodeName } from "../types";

export class OnlyException extends Error {
    constructor(node: XsNode, elementTypes: NodeName[]) {
        super(`${node.name} element should just have one of exceesive ${elementTypes.join(', ')} elements`)
    }
}