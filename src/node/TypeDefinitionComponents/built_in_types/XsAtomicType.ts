import { TsDefinition } from "../../../TsDefinitions";
import { XsType } from "./XsType";

export class XsAnyAtomicType extends XsType {
    get Name(): string { return "anyAtomicType"; }
    toTsDefinition(): TsDefinition {
        throw new Error("Method not implemented.");
    }
    type: string = "xs:anyAtomicType";

    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }

}