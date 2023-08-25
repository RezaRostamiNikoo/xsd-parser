import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsType } from "./XsType";

export class XsNMTOKEN extends XsType {
    get Name(): string {
        return "NMTOKEN"
    }
    toTsDefinition(): TsSchema {
        return null;
    }
    type: string = "xs:NMTOKEN";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}