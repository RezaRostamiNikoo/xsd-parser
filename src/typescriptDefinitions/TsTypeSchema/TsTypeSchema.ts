import { ITsTypeLiteralSchema, ITsTypeSchema } from "../interfaces";
import { TypeUsage } from "../types";

export class TsTypeSchema implements ITsTypeSchema {
    isTypeSchema: boolean = true;

    usage: TypeUsage;
    reference?: string;
    literal?: ITsTypeLiteralSchema;

    public static makeTypeLiteral(literal: ITsTypeLiteralSchema): TsTypeSchema {
        const tts = new TsTypeSchema();
        tts.literal = literal;
        tts.usage = "literal";
        return tts;
    }

    public static makeTypeDefinition(reference: string, literal: ITsTypeLiteralSchema): TsTypeSchema {
        const tts = new TsTypeSchema();
        tts.reference = reference;
        tts.literal = literal;
        tts.usage = "definition";
        return tts;
    }

    public static makeTypeReference(reference: string): TsTypeSchema {
        const tts = new TsTypeSchema();
        tts.reference = reference;
        tts.usage = "refrencing";
        return tts;
    }

}



