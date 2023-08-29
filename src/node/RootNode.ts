import { XsNode } from "./XsNode";
import { TagType } from "./types";

export class RootNode extends XsNode {
    _tag: TagType = "root";
    checks(): boolean {
        throw new Error("Method not implemented.");
    }




}