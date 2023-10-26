import { ITsSchema } from "../../typescriptDefinitions";
import { XsNode } from "../XsNode";
import { TagType } from "../types";

export class XsExtensionNode extends XsNode {
    _tag: TagType = "xs:extension";

    getTsSchema(): ITsSchema {


        return null;
    }
}