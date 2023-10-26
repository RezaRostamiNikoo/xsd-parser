import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsFloat extends XsType {
    _tag: string = "xs:float";
    getTsSchema(): ts.TsSchema { return ts.makeTypeReference("number"); }
}