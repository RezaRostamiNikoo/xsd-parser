import { TsDefinition } from "../../../TsDefinitions";
import { XsType } from "./XsType";

export class XsToken extends XsType {
    get Name(): string {
        return "token"
    }
    toTsDefinition(): TsDefinition {
        return null;
    }
    type: string = "xs:token";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}