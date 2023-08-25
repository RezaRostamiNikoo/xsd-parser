import { TsDefinition } from "../../../TsDefinitions";
import { XsToken } from "./XsToken";

export class XsIDREF extends XsToken {
    get Name(): string {
        return "IDREF"
    }
    toTsDefinition(): TsDefinition {
        return null;
    }

    type: string = "xs:IDREF";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}