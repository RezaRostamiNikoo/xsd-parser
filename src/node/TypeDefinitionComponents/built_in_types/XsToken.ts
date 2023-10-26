import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsToken extends XsType {
    _tag: string = "xs:token";
    getTsSchema(): ts.TsSchema {
        return ts.makeSimpleType("string", "Token");
    }
}