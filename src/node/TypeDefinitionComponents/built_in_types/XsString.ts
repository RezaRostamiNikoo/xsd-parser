import { TsDefinition } from "../../../TsDefinitions";
import { XsType } from "./XsType";

export class XsString extends XsType {
    get Name(): string {
        return "String"
    }
    toTsDefinition(): TsDefinition {
        return null;
    }
    type: string = "xs:string";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}