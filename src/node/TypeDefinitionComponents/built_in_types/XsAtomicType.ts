import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsType } from "./XsType";

export class XsAnyAtomicType extends XsType {
    get Name(): string { return "anyAtomicType"; }
    toTsDefinition(): TsSchema {
        throw new Error("Method not implemented.");
    }
    type: string = "xs:anyAtomicType";

    variety(): "atomic" | "list" | "union" {
        return "atomic";
    }

}