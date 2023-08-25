import { TsDefinition } from "../../../TsDefinitions";
import { XsType } from "./XsType";

export class XsNMTOKENS extends XsType {
    get Name(): string {
        return "NMTOKENS"
    }
    toTsDefinition(): TsDefinition {
        return null;
    }
    type: string = "xs:NMTOKENS";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}