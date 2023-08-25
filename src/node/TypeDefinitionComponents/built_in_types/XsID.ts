import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsNCName } from "./XsNCName";
import { XsType } from "./XsType";

export class XsID extends XsType {
    get Name(): string { return "ID"; }
    toTsDefinition(): TsSchema { return null; }

    type: string = "xs:ID";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}