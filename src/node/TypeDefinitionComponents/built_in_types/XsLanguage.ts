import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsLanguage extends XsType {
    _tag: string = "xs:language";
    getTsSchema(): ts.TsSchema {
        return ts.makeSimpleType("Token", "Language");
    }
}