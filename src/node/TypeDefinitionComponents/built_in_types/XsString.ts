import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsString extends XsType {
    _tag: string = "xs:string";
    getTsSchema(): ts.TsSchema { return ts.makeTypeReference("string"); }
}