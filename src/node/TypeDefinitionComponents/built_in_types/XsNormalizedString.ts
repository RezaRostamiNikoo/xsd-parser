import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsType } from "./XsType";

export class XsNormalizedString extends XsType {
    get Name(): string {
        return "normalizedString"
    }
    toTsDefinition(): TsSchema {
        return null;
    }
    type: string = "xs:normalizedString";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}