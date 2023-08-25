import { TsDefinition } from "../../../TsDefinitions";
import { XsAnyType } from "./XsAnyType";
import { XsType } from "./XsType";

/**
 * its parent is {@link XsAnyType} 
 */
export class XsAnySimpleType extends XsType {
    get Name(): string { return "anySimpleType" }
    toTsDefinition(): TsDefinition {
        throw new Error("Method not implemented.");
    }
    type: string = "xs:anySimpleType";

    variety(): "atomic" | "list" | "union" {

        throw new Error("XsAnySimpleType.veriety | it should be defined");
    }
}
