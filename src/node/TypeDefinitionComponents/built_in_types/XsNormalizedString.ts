import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsNormalizedString extends XsType {
    _tag: string = "xs:normalizedString";
    getTsSchema(): ts.TsSchema {
        return ts.makeSimpleType("string", "NormalizedString");
    }
}