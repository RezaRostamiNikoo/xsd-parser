import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsDecimal extends XsType {
    _tag: string = "xs:decimal";
    getTsSchema(): ts.TsSchema { return ts.makeTypeReference("number"); }
}