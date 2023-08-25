
export class TsDefinition {
    definitionType: "typeLiteral" | "type" | "enum";

    definition:
        | TsUnionTypeLiteral
        | TsArrayTypeLiteral
        | TsSimpleTypeLiteral
        | TsTypeDefinition
        | TsEnumDefinition
        ;


    public static makeEnum(name: string, items: Array<string>): TsDefinition {
        const result = new TsDefinition();
        result.definitionType = "enum";
        result.definition = new TsEnumDefinition(name, items);
        return result;
    }



    public static makeArrayType(type: string, name?: string): TsDefinition {
        const ttd = new TsTypeDefinition();
        ttd.literal = new TsArrayTypeLiteral(type);
        ttd.name = name;
        const result = new TsDefinition();
        result.definitionType = "typeLiteral";
        result.definition = ttd;
        return result;
    }

    public static makeUnionType(type: string[], name?: string): TsDefinition {
        const ttd = new TsTypeDefinition();
        ttd.literal = new TsUnionTypeLiteral(type);
        ttd.name = name;
        const result = new TsDefinition();
        result.definitionType = "typeLiteral";
        result.definition = ttd;
        return result;
    }

    public static makeSimpleType(type: string, name?: string): TsDefinition {
        const ttd = new TsTypeDefinition();
        ttd.literal = new TsSimpleTypeLiteral(type);
        ttd.name = name;
        const result = new TsDefinition();
        result.definitionType = "typeLiteral";
        result.definition = ttd;
        return result;
    }
}

export class TsTypeDefinition {
    name?: string;
    literal: TsUnionTypeLiteral | TsArrayTypeLiteral | TsSimpleTypeLiteral;
}

export class TsUnionTypeLiteral {
    isUnionType: boolean = true;
    items: Array<string>;
    constructor(items: Array<string>) {
        this.items = items;
    }
}

export class TsArrayTypeLiteral {
    isArrayType: boolean = true;
    type: string;
    constructor(type: string) {
        this.type = type;
    }
}

export class TsSimpleTypeLiteral {
    isSimpleType: boolean = true;
    type: string;
    constructor(type: string) {
        this.type = type;
    }
}

export class TsEnumDefinition {
    name: string;
    isEnum: boolean = true;

    items: Array<string>;
    constructor(name: string, items: Array<string>) {
        this.name = name;
        this.items = items;
    }
}