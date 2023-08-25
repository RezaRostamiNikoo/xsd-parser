
import { TsDefinition } from "../../../TsDefinitions";
import { XsInteger } from "./XsInteger";
import { XsType } from "./XsType";

export class XsLong extends XsType {
    get Name(): string {
        return "long"
    }
    toTsDefinition(): TsDefinition {
        return null;
    }
    type: string = "xs:long";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}