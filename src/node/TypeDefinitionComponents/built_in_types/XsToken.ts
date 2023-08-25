import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsType } from "./XsType";

export class XsToken extends XsType {
    get Name(): string {
        return "token"
    }
    toTsDefinition(): TsSchema {
        return null;
    }
    type: string = "xs:token";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}