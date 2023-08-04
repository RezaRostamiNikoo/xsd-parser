import { mapToObject } from "../helpers";
import { XsElementNode } from "./XsElementNode";

export class XsNode {
    public static elements: Array<XsNode> = [];

    ///////////////////////////////////
    protected nodename: string;
    protected attributes: Map<string, string> = new Map();
    protected children: Array<XsNode> = [];
    protected parent: XsNode = null;
    protected next: XsNode = null;
    protected prev: XsNode = null;
    protected siblings: Array<XsNode> = []

    constructor(node: Element) {
        this.nodename = node.nodeName;
        this.extractAttributes(node);
        this.extractsChildren(node);
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
                case "xs:element": this.addElement(child); break;
                default: () => { }
            }
        });
    }

    addElement(node: Element) {
        const element = new XsElementNode(node);
        XsNode.elements.push(element);
        this.children.push(element);
    }

    toJson(): object {
        return {
            nodename: this.nodename,
            attributes: mapToObject(this.attributes),
            children: this.children.map(child => child.toJson())
        }
    }
}