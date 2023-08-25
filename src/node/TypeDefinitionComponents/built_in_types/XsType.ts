import { TsSchema } from "../../../typescriptDefinitions/TsTypeSchema/TsTypeSchema";
import { ITypeDefinition } from "../ITypeDefinition";

export abstract class XsType implements ITypeDefinition {
    abstract type: string;
    parent: ITypeDefinition;

    get BaseTypeDefinition(): string { return this.type; }
    get TypeParent(): ITypeDefinition { return this.parent; }
    abstract get Name(): string;

    abstract variety(): "atomic" | "list" | "union";
    abstract toTsDefinition(): TsSchema;
    constructor(parent: ITypeDefinition) {
        if (this.parent)
            this.parent = parent;
    }
}