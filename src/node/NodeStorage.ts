import { makeid } from "../utils/helpers";
import { XsAttributeNode, XsElementNode } from "./DeclarationComponents";
import { XsAttributeGroupNode } from "./GroupDefinitionComponents";
import { XsComplexTypeNode, XsSimpleTypeNode } from "./TypeDefinitionComponents";
import { XsNode } from "./XsNode";
import { TagType } from "./types";

export class NodeStorage {
    private elements: Map<string, XsElementNode> = new Map();
    private complexTypes: Map<string, XsComplexTypeNode> = new Map();
    private simpleTypes: Map<string, XsSimpleTypeNode> = new Map();
    private attributes: Map<string, XsAttributeNode> = new Map();
    private attributeGroups: Map<string, XsAttributeGroupNode> = new Map();

    add(node: XsNode) {
        if (!node.attribute.get("name")) return;
        const name = node.attribute.get("name");
        switch (node.Tag) {
            case "xs:element": return this.elements.set(name, node as XsElementNode);
            case "xs:complexType": return this.complexTypes.set(name, node as XsComplexTypeNode);
            case "xs:simpleType": return this.simpleTypes.set(name, node as XsSimpleTypeNode);
            case "xs:attribute": return this.attributes.set(name, node as XsAttributeNode);
            case "xs:attributeGroup": return this.attributeGroups.set(name, node as XsAttributeGroupNode);
            default: return;
        }
    }


    getXsAttributeNode(name: string): XsAttributeNode { return this.attributes.get(name); }
    getXsAttributeGroupNode(name: string): XsAttributeGroupNode { return this.attributeGroups.get(name); }







}