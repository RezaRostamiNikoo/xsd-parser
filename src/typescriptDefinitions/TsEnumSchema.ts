import { ITsEnumSchema } from "./interfaces";

export class TsEnumSchema implements ITsEnumSchema {
    isEnumSchema: boolean = true;

    items: string[];
    reference: string;

    public static makeEnum(reference: string, items: Array<string>): TsEnumSchema {
        const tes = new TsEnumSchema();
        tes.reference = reference;
        tes.items = items;
        return tes;
    }
}