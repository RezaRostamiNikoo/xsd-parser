import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsName extends XsType {
    _tag: string = "xs:Name";
    getTsSchema(): ts.TsSchema {
        return ts.makeSimpleType("Token", "Name");
    }
}