import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsDouble extends XsType {
    _tag: string = "xs:double";
    getTsSchema(): ts.TsSchema { return ts.makeTypeReference("number"); }

}