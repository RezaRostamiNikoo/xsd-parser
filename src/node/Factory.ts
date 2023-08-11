import { XsNode } from "./XsNode";
import * as nodes from ".";


export function factory(className: string): XsNode {
    if ((nodes as any)[className]) {
        const classDef = (nodes as any)[className];
        return new classDef();
    } else {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", className)
    }

}

