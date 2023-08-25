import { ITsTypeLiteralSchema } from "../interfaces";

export class TsTypeUnionLiteral implements ITsTypeLiteralSchema {
    isUnionType: boolean = true;
    items: Array<string>;
    constructor(items: Array<string>) {
        this.items = items;
    }
}

