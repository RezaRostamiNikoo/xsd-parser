import * as ts from "../../typescriptDefinitions";

export interface ITypeDefinition {
    get Name(): string;
    get BaseTypeDefinition(): string;
    get TypeParent(): ITypeDefinition;

    variety(): "atomic" | "list" | "union";

    toTsDefinition(): ts.TsSchema;


}   