import { XsAttributeNode, XsElementNode } from "./DeclarationComponents";
import { XsAttributeGroupNode } from "./GroupDefinitionComponents";
import { XsComplexTypeNode, XsSimpleTypeNode } from "./TypeDefinitionComponents";
import { XsNode } from "./XsNode";
import { NodeName } from "./types";

export class NodeStorage {
    private elements: Map<string, XsElementNode> = new Map();
    private complexTypes: Map<string, XsComplexTypeNode> = new Map();
    private simpleTypes: Map<string, XsSimpleTypeNode> = new Map();
    private attributes: Map<string, XsAttributeNode> = new Map();
    private attributeGroups: Map<string, XsAttributeGroupNode> = new Map();


    addNode(node: XsNode) {

    }







}