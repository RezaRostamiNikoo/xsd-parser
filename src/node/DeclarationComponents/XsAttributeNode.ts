import * as ts from "../../typescriptDefinitions";
import { XsSimpleTypeNode } from "../TypeDefinitionComponents";
import { XsNode } from "../XsNode";

export class XsAttributeNode extends XsNode {
    checks(): boolean {
        if (this.hasChildrenExcept("xs:simpleType"))
            throw new Error("XsAttributeNode.checks | it can have just xs:simpleType as its children ");
        return true;
    }

    getType(): string { return this.attributes.get("type"); }
    getName(): string { return this.attributes.get("name"); }
    getRef(): string { return this.attributes.get("Ref"); }
    getFixed(): string { return this.attributes.get("fixed"); }
    getUse(): string { return this.attributes.get("use"); }

    getTsSchema(): ts.TsSchema {
        if (!this.hasChildren()) {
            if (this.getName() && this.getType() && !this.getRef()) {
                const optional = this.getUse() === "optional";
                return ts.makeAttribute(this.getName(), this.getType(), optional, this.getFixed());
            }
        } else {
            const sn = this.firstChild<XsSimpleTypeNode>("xs:simpleType");

        }
    }
}