import { TsDefinition } from "../../../TsDefinitions";
import { XsType } from "./XsType";

export class XsDateTime extends XsType {
    get Name(): string { return "DateTime"; }


    type: string = "xs:dateTime";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }

    toTsDefinition(): TsDefinition {
        throw new Error("Method not implemented.");
    }
}