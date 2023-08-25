import { TsDefinition } from "../../../TsDefinitions";
import { XsType } from "./XsType";

export class XsNMTOKEN extends XsType {
    get Name(): string {
        return "NMTOKEN"
    }
    toTsDefinition(): TsDefinition {
        return null;
    }
    type: string = "xs:NMTOKEN";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}