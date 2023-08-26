import { ITsDefinitionSchema } from "./interfaces";

export class TsTypeReferenceSchema implements ITsDefinitionSchema {
    isTypeReference: boolean = true;
    reference: string;

    constructor(reference: string) {
        this.reference = reference;
    }


    toJson(): Object {
        return {}
    }
}