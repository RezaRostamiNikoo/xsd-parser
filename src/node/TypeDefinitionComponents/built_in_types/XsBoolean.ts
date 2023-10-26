import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsBoolean extends XsType {
    _tag: string = "xs:boolean";
    getTsSchema(): ts.TsSchema { return ts.makeTypeReference("boolean"); }
}