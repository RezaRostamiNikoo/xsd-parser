import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsType } from "./XsType";

export class XsString extends XsType {
    get Name(): string {
        return "String"
    }
    toTsDefinition(): TsSchema {
        return null;
    }
    type: string = "xs:string";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}