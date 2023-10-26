
import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsInteger extends XsType {
    _tag: string = "xs:integer";
    getTsSchema(): ts.TsSchema { return ts.makeTypeReference("number"); }
}