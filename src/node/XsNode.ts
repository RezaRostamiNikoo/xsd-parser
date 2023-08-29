import { TagType } from "./types";
import { makeid } from "../utils/helpers";
import { mapToObject } from "../utils/map";
import { factory } from "./Factory";
import { ITypeDefinition } from "./TypeDefinitionComponents/ITypeDefinition";
import { AttributeHandler } from "./AttributeHandler";

export abstract class XsNode {

    public static elements: Map<string, XsNode> = new Map();
    public static attributes: Map<string, XsNode> = new Map();
    public static types: Map<string, ITypeDefinition> = new Map();
    public static complexTypes: Map<string, XsNode> = new Map();

    ///////////////////////////////////
    abstract readonly _tag: TagType;
    protected attributes: AttributeHandler = new AttributeHandler();
    protected children: Array<XsNode> = [];
    protected parent: XsNode = null;
    protected root: XsNode = null;
    protected next: XsNode = null;
    protected prev: XsNode = null;
    protected siblings: Array<XsNode> = []

    get Tag(): string { return this._tag; }
    get Parent(): XsNode { return this.parent; }
    get Attributes(): AttributeHandler { return this.attributes; }


    getAttr(attribute: string): string { return this.attributes.get(attribute); }




    Children<T extends XsNode>(tagType?: TagType): Array<T> {
        if (!tagType)
            return this.children as Array<T>;
        return this.children.filter(c => c.Tag === tagType) as Array<T>;
    }

    setNode(node: Element): XsNode {
        this.extractAttributes(node);
        this.extractsChildren(node);

        this.checks();
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
            switch (child.nodeName as TagType) {
                case "xs:element": this.children.push(this.createXsNode(child, "XsElementNode", XsNode.elements)); break;
                case "xs:attribute": this.children.push(this.createXsNode(child, "XsAttributeNode", XsNode.attributes)); break;
                case "xs:simpleType": this.children.push(this.createXsNode(child, "XsSimpleTypeNode", XsNode.types)); break;
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

    private createXsNode(node: Element, elementName: string, map?: Map<string, any>) {
        const element = factory(elementName).setNode(node);
        element.parent = this;
        map?.set(element.getAttr("name") || makeid(), element);
        return element;
    }
    /////////////////////////////////////////////



    /** 
     * checks if node has any children at all or any children of nodetype, if represented
     * @param {TagType} nodetype node type to be checkd
     * @returns it return 0 if node does not have any children or any children of nodeType, if represented
     * */
    hasChildren(nodetype?: TagType): number {
        if (nodetype)
            return this.children.filter(c => c._tag === nodetype).length;
        return this.children.length
    }

    /** 
     * checks if node has any children except the given nodetype
     * @param {TagType} nodetype node type to be checkd
     * @returns it return 0 if node does not have any children except given nodetypr
     * */
    hasChildrenExcept(nodetype: TagType): number {
        return this.children.filter(c => c._tag !== nodetype).length;
    }
    areAllChildren(nodeType: TagType): boolean {
        return this.children.every(c => c._tag === nodeType);
    }

    isParent(nodeType: TagType): boolean {
        return this.parent._tag === nodeType;
    }


    firstChild<T extends XsNode>(nodeType?: TagType): T {
        if (!nodeType) return this.children[0] as T;
        return this.children.filter(c => c._tag === nodeType)[0] as T;
    }



    toJson(): object {
        return {
            nodename: this._tag,
            attributes: this.attributes.toObject(),
            children: this.children.map(child => child.toJson())
        }
    }

    abstract checks(): boolean;
}