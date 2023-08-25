import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsType } from "./XsType";

export class XsDecimal extends XsType {
    get Name(): string { return "decimal"; }

    type: string = "xs:decimal";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }

    toTsDefinition(): TsSchema { return null; }


}