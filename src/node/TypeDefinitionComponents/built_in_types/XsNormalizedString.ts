import { TsDefinition } from "../../../TsDefinitions";
import { XsType } from "./XsType";

export class XsNormalizedString extends XsType {
    get Name(): string {
        return "normalizedString"
    }
    toTsDefinition(): TsDefinition {
        return null;
    }
    type: string = "xs:normalizedString";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}