import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsType } from "./XsType";

export class XsFloat extends XsType {

    get Name(): string { return "float"; }

    toTsDefinition(): TsSchema { return null; }

    type: string = "xs:float";

    variety(): "atomic" | "list" | "union" {

        return "atomic";

    }

}