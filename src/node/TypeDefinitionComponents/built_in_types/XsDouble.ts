import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsType } from "./XsType";

export class XsDouble extends XsType {
    get Name(): string { return "double"; }

    type: string = "xs:double";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
    toTsDefinition(): TsSchema { return null; }

}