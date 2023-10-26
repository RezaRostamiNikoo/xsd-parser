import * as ts from "../../../typescriptDefinitions";
import { XsToken } from "./XsToken";

export class XsIDREF extends XsToken {
    _tag: string = "xs:IDREF";
    getTsSchema(): ts.TsSchema {
        return ts.makeSimpleType("NCName", "IDREF");
    }
}