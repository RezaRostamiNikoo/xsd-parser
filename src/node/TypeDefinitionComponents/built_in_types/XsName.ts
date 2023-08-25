import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsToken } from "./XsToken";
import { XsType } from "./XsType";

export class XsName extends XsType {
    get Name(): string {
        return "Name"
    }
    toTsDefinition(): TsSchema {
        return null;
    }
    type: string = "xs:Name";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}