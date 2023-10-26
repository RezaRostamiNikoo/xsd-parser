import { XsNode } from "./XsNode";
import * as nodes from ".";
import { UnknownNodeException } from "../errors";


export function factory(className: string): XsNode {
    if ((nodes as any)[className]) {
        const classDef = (nodes as any)[className];
        return new classDef();
    }
    throw new UnknownNodeException(className);
}

