import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsID extends XsType {
    _tag: string = "xs:ID";
    getTsSchema(): ts.TsSchema {
        return ts.makeSimpleType("NCName", "ID");
    }
}