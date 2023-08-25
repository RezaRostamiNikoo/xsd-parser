
import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsType } from "./XsType";

export class XsInteger extends XsType {
    get Name(): string {
        return "integer"
    }
    toTsDefinition(): TsSchema {
        return null;
    }
    type: string = "xs:integer";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}