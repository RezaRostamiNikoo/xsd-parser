import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsType } from "./XsType";

export class XsBoolean extends XsType {
    get Name(): string { return "boolean"; }

    type: string = "xs:boolean";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }

    toTsDefinition(): TsSchema {
        return null;
    }
}