import { XsNode } from "../node";
import { TagType } from "../node/types";

export class OnlyException extends Error {
    constructor(node: XsNode, elementTypes: TagType[]) {
        super(`${node.Name} element should just have one of exceesive ${elementTypes.join(', ')} elements`)
    }
}