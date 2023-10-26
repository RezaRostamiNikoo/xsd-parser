import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsDateTime extends XsType {
    _tag: string = "xs:dateTime";
    getTsSchema(): ts.TsSchema { return ts.makeTypeReference("string"); }
}