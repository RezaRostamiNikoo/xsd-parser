import { TsDefinition } from "../../../TsDefinitions";
import { XsToken } from "./XsToken";
import { XsType } from "./XsType";

export class XsLanguage extends XsType {
    get Name(): string {
        return "language"
    }
    toTsDefinition(): TsDefinition {
        return null;
    }
    type: string = "xs:language";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}