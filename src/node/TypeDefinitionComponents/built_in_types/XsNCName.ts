import { TsDefinition } from "../../../TsDefinitions";
import { XsName } from "./XsName";
import { XsType } from "./XsType";

export class XsNCName extends XsType {
    get Name(): string {
        return "NCName"
    }
    toTsDefinition(): TsDefinition {
        return null;
    }
    type: string = "xs:ncname";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }

}