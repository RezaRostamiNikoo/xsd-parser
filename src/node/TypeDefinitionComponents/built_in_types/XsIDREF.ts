import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsToken } from "./XsToken";

export class XsIDREF extends XsToken {
    get Name(): string {
        return "IDREF"
    }
    toTsDefinition(): TsSchema {
        return null;
    }

    type: string = "xs:IDREF";
    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}