import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsAnyAtomicType extends XsType {
    _tag: string = "xs:anyAtomicType";
    getTsSchema(): ts.TsSchema { return ts.makeSimpleType("AnySimpleType", "AnyAtomicType"); }
}