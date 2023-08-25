
import { TsDefinition } from "../../../TsDefinitions";
import { XsType } from "./XsType";

export class XsInteger extends XsType {
    get Name(): string {
        return "integer"
    }
    toTsDefinition(): TsDefinition {
        return null;
    }
    type: string = "xs:integer";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}