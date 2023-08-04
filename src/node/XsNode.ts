import { makeid, mapToObject } from "../helpers";
import { factory } from "./Factory";

export class XsNode {
    public static elements: Map<string, XsNode> = new Map();
    public static attributes: Map<string, XsNode> = new Map();
    public static simpleTypes: Map<string, XsNode> = new Map();
    public static complexTypes: Map<string, XsNode> = new Map();

    ///////////////////////////////////
    protected nodename: string;
    protected attributes: Map<string, string> = new Map();
    protected children: Array<XsNode> = [];
    protected parent: XsNode = null;
    protected next: XsNode = null;
    protected prev: XsNode = null;
    protected siblings: Array<XsNode> = []

    setNode(node: Element): XsNode {
        this.nodename = node.nodeName;
        this.extractAttributes(node);
        this.extractsChildren(node);


        return this;
    }

    private extractAttributes(node: Element) {
        node.attributes
        for (let i = 0; i < node.attributes.length; i++) {
            this.attributes.set(node.attributes[i].name, node.attributes[i].value);
        }
    }

    private extractsChildren(node: Element) {
        if (!node.childNodes) return [];
        Array.from(node.childNodes).forEach((child: Element) => {
            switch (child.nodeName) {
                case "xs:element": this.children.push(this.createXsNode(child, "XsElementNode", XsNode.elements)); break;
                case "xs:attribute": this.children.push(this.createXsNode(child, "XsAttributeNode", XsNode.attributes)); break;
                case "xs:simpleType": this.children.push(this.createXsNode(child, "XsSimpleTypeNode", XsNode.simpleTypes)); break;
                case "xs:complexType": this.children.push(this.createXsNode(child, "XsComplexTypeNode", XsNode.complexTypes)); break;
                
                case "xs:attributeGroup": this.children.push(this.createXsNode(child, "XsAttributeGroupNode")); break;
                case "xs:choice": this.children.push(this.createXsNode(child, "XsChoiceNode")); break;
                case "xs:complexContent": this.children.push(this.createXsNode(child, "XsComplexContentNode")); break;
                case "xs:enumeration": this.children.push(this.createXsNode(child, "XsEnumerationNode")); break;
                case "xs:extension": this.children.push(this.createXsNode(child, "XsExtensionNode")); break;
                case "xs:group": this.children.push(this.createXsNode(child, "XsGroupNode")); break;
                case "xs:list": this.children.push(this.createXsNode(child, "XsListNode")); break;
                case "xs:restriction": this.children.push(this.createXsNode(child, "XsRestrictionNode")); break;
                case "xs:sequence": this.children.push(this.createXsNode(child, "XsSequenceNode")); break;
                case "xs:simpleContent": this.children.push(this.createXsNode(child, "XsSimpleContentNode")); break;
                default: () => { }
            }
        });
    }

    private createXsNode(node: Element, elementName: string, map?: Map<string, XsNode>) {
        const element = factory(elementName).setNode(node);
        map?.set(element.name || makeid(), element);
        return element;
    }

    toJson(): object {
        return {
            nodename: this.nodename,
            attributes: mapToObject(this.attributes),
            children: this.children.map(child => child.toJson())
        }
    }

    get name(): string {
        return this.attributes.get("name");
    }
}