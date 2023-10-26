import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsNMTOKENS extends XsType {
    _tag: string = "xs:NMTOKENS";
    getTsSchema(): ts.TsSchema { return ts.makeArrayType("NMTOKEN", "NMTOKENS"); }
}