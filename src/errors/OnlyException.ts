import { XsNode } from "../node";
import { NodeName } from "../node/types";

export class OnlyException extends Error {
    constructor(node: XsNode, elementTypes: NodeName[]) {
        super(`${node.Name} element should just have one of exceesive ${elementTypes.join(', ')} elements`)
    }
}