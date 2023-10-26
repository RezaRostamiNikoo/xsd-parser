import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsNCName extends XsType {
    _tag: string = "xs:ncname";
    getTsSchema(): ts.TsSchema {
        return ts.makeSimpleType("Name", "NCName");
    }

}