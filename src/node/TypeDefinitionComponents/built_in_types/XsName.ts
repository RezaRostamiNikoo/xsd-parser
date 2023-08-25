import { TsDefinition } from "../../../TsDefinitions";
import { XsToken } from "./XsToken";
import { XsType } from "./XsType";

export class XsName extends XsType {
    get Name(): string {
        return "Name"
    }
    toTsDefinition(): TsDefinition {
        return null;
    }
    type: string = "xs:Name";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}