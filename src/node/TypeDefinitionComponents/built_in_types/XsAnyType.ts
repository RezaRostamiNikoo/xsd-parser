import * as ts from "../../../typescriptDefinitions";
import { XsType } from "./XsType";

export class XsAnyType extends XsType {
    _tag: string = "xs:anyType";
    getTsSchema(): ts.TsSchema { return ts.makeSimpleType("any", "AnyType"); }
    parent: XsType = this; // itself

    constructor() {
        super(null)
    }
}