import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsType } from "./XsType";

export class XsDateTime extends XsType {
    get Name(): string { return "DateTime"; }


    type: string = "xs:dateTime";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }

    toTsDefinition(): TsSchema {
        throw new Error("Method not implemented.");
    }
}