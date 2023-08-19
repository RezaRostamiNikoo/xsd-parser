export class BaseTypeDefinition {

    private type: string;

    constructor(type: string) {
        if (!type) throw new Error("BaseTypeDefinition.constructor | type should be defined");
        this.type = type;
    }


    get Veriety(): "atomic" | "list" | "union" {
        return "atomic";
    }
}