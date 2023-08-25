import { TsDefinition } from "../../TsDefinitions";

export interface ITypeDefinition {
    get Name(): string;
    get BaseTypeDefinition(): string;
    get TypeParent(): ITypeDefinition;

    variety(): "atomic" | "list" | "union";

    toTsDefinition(): TsDefinition;


}   