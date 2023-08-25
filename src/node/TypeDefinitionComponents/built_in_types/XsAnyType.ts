import { TsDefinition } from "../../../TsDefinitions";
import { ITypeDefinition } from "../ITypeDefinition";
import { XsType } from "./XsType";

export class XsAnyType extends XsType {
    get Name(): string { return "anyTypre"; }
    toTsDefinition(): TsDefinition {
        throw new Error("Method not implemented.");
    }

    type: string = "xs:anyType";
    parent: ITypeDefinition = this; // itself

    constructor() {
        super(null)
    }

    variety(): "atomic" | "list" | "union" {
        throw new Error("XsAnySimpleType.veriety | it should be defined");
    }
}