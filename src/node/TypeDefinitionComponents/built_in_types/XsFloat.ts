import { TsDefinition } from "../../../TsDefinitions";
import { XsType } from "./XsType";

export class XsFloat extends XsType {

    get Name(): string { return "float"; }

    toTsDefinition(): TsDefinition { return null; }

    type: string = "xs:float";

    variety(): "atomic" | "list" | "union" {

        return "atomic";

    }

}