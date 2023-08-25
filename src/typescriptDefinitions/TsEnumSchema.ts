import { ITsEnumSchema } from "./interfaces";
import { EnumUsage } from "./types";

export class TsEnumSchema implements ITsEnumSchema {
    isEnumSchema: boolean = true;
    usage: EnumUsage;

    items?: string[];
    reference?: string;

    public static makeEnumDefinition(reference: string, items: Array<string>): TsEnumSchema {
        const tes = new TsEnumSchema();
        tes.usage = "definition";
        tes.reference = reference;
        tes.items = items;
        return tes;
    }

    public static makeEnumItems(items: Array<string>): TsEnumSchema {
        const tes = new TsEnumSchema();
        tes.items = items;
        tes.usage = "items";
        return tes;
    }

    public static makeEnumReference(reference: string): TsEnumSchema {
        const tes = new TsEnumSchema();
        tes.reference = reference;
        tes.usage = "refrencing";
        return tes;
    }
}