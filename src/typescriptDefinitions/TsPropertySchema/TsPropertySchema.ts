import { TsTypeSchema } from "../TsTypeSchema";
import { ITsPropertySchema } from "../interfaces";

export class TsPropertySchema implements ITsPropertySchema {
    isPropertySchema: boolean = true;
    reference: string;
    type: TsTypeSchema;


    toJson(): Object {
        return {
            reference: this.reference,
            type: this.type
        }
    }
}