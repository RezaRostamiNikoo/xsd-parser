
import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsLong extends XsType {
    _tag: string = "xs:long";
    getTsSchema(): ts.TsSchema { return ts.makeTypeReference("number"); }
}