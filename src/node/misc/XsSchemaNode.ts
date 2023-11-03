import * as ts from "../../typescriptDefinitions";
import { XsNode } from "../XsNode";
import { TagType } from "../types";


export class XsSchemaNode extends XsNode {
    _tag: TagType = "xs:schema";
}