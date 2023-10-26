import * as ts from "../../../typescriptDefinitions";

export abstract class XsType {
    abstract _tag: string;
    parent: XsType;

    get TypeParent(): XsType { return this.parent; }

    abstract getTsSchema(): ts.TsSchema;
    constructor(parent: XsType) {
        if (this.parent)
            this.parent = parent;
    }
}