import { TsDefinition } from "../../../TsDefinitions";
import { XsNCName } from "./XsNCName";
import { XsType } from "./XsType";

export class XsID extends XsType {
    get Name(): string { return "ID"; }
    toTsDefinition(): TsDefinition { return null; }

    type: string = "xs:ID";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}