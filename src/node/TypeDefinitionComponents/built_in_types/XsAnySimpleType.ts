import * as ts from "../../../typescriptDefinitions";
import { XsAnyType } from "./XsAnyType";
import { XsType } from "./XsType";

/**
 * its parent is {@link XsAnyType} 
 */
export class XsAnySimpleType extends XsType {
    _tag: string = "xs:anySimpleType";
    getTsSchema(): ts.TsSchema { return ts.makeSimpleType("AnyType", "AnySimpleType"); }
}
