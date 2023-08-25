import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsToken } from "./XsToken";
import { XsType } from "./XsType";

export class XsLanguage extends XsType {
    get Name(): string {
        return "language"
    }
    toTsDefinition(): TsSchema {
        return null;
    }
    type: string = "xs:language";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}