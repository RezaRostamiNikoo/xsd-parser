import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsNMTOKEN extends XsType {
    _tag: string = "xs:NMTOKEN";
    getTsSchema(): ts.TsSchema {
        return ts.makeSimpleType("Token", "NMTOKEN");
    }
}