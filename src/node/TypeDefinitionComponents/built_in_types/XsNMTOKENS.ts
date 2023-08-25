import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsType } from "./XsType";

export class XsNMTOKENS extends XsType {
    get Name(): string {
        return "NMTOKENS"
    }
    toTsDefinition(): TsSchema {
        return null;
    }
    type: string = "xs:NMTOKENS";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}