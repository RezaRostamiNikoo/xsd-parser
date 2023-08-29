import { ITsSchema, ITsTypeSchema } from "../typescriptDefinitions";
import { XsNode } from "./XsNode";
import { XsRestrictionNode } from "./XsRestrictionNode";
import { TagType } from "./types";

export class XsComplexContentNode extends XsNode {
    
    _tag: TagType = "xs:complexContent";

    checks(): boolean {
        if ((!this.hasChildren("xs:restriction") && !this.hasChildren("xs:extension")) || !this.hasChildren()) {
            throw new Error("XsComplexContentNode.checks | there is a problem");
        }
        return true;
    }

    getTsSchema(): ITsSchema {
        if (this.hasChildren("xs:restriction")) {
            const rs = this.firstChild<XsRestrictionNode>("xs:restriction").getTsSchema();
            if (rs.type === "type" && (rs.definition as ITsTypeSchema).usage === "literal") return rs;
            else if (rs.type === "reference") return rs;
        } else if (this.hasChildren("xs:extension")) {
            throw new Error("asdasdasdasdasdasdsd")
        }

        throw new Error("XsComplexContentNode.getTsSchema | ");


    }

}