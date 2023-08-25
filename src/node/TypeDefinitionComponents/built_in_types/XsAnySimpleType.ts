import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { XsAnyType } from "./XsAnyType";
import { XsType } from "./XsType";

/**
 * its parent is {@link XsAnyType} 
 */
export class XsAnySimpleType extends XsType {
    get Name(): string { return "anySimpleType" }
    toTsDefinition(): TsSchema {
        throw new Error("Method not implemented.");
    }
    type: string = "xs:anySimpleType";

    variety(): "atomic" | "list" | "union" {

        throw new Error("XsAnySimpleType.veriety | it should be defined");
    }
}
