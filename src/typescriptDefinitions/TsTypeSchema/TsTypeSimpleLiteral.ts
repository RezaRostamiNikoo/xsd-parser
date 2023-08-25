import { ITsTypeLiteralSchema } from "../interfaces";

export class TsTypeSimpleLiteral implements ITsTypeLiteralSchema {
    isSimpleType: boolean = true;
    reference: string;
    constructor(reference: string) {
        this.reference = reference;
    }
}

