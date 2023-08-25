import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsName } from "./XsName";
import { XsType } from "./XsType";

export class XsNCName extends XsType {
    get Name(): string {
        return "NCName"
    }
    toTsDefinition(): TsSchema {
        return null;
    }
    type: string = "xs:ncname";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }

}