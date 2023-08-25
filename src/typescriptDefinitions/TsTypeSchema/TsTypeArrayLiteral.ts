import { ITsTypeLiteralSchema } from "../interfaces";

export class TsArrayTypeLiteral implements ITsTypeLiteralSchema {
    isArrayType: boolean = true;
    type: string;
    constructor(type: string) {
        this.type = type;
    }
}