import { TagType } from "./types";
import { factory } from "./Factory";
import { AttributeHandler } from "./AttributeHandler";
import { elementMapping } from "../constant";
import { XsTree } from './XsTree';
import { getAttrsAsMap } from '../utils/helpers';

export abstract class XsNode {
    ///////////////////////////////////
    protected abstract readonly _tag: TagType;
    private _attributes: AttributeHandler = new AttributeHandler()
    protected _children: Array<XsNode> = []
    protected _parent: XsNode = null
    protected _root: XsNode = null
    protected _tree: XsTree = null

    get Tag(): TagType { return this._tag }
    /** holds the parent Node */
    get Parent(): XsNode { return this._parent }
    /** holds all the attributes belonged to the node */
    get attribute(): AttributeHandler { return this._attributes }
    /** holds list of children */
    get children(): Array<XsNode> { return this._children }
    /** holds whole tree object */
    get tree(): XsTree { return this._tree }

    /**
     * returns an attribute
     * @param {string} key
     * @returns {string} 
     */
    getAttr(key: string): string { return this.attribute.get(key) }

    /**
     * stores an attributes in the attributes list
     * @param {string} key 
     * @param {string} value 
     * @returns {this}
     */
    setAttr(key: string, value: string): this { this.attribute.set(key, value); return this }

    /**
     * add a child to the node's children list
     * @param {XsNode} child 
     * @returns {this}
     */
    add(child: XsNode): this {
        if (!child || !(child instanceof XsNode)) return this
        this._children.push(child)
        child.setParent(this)
        return this
    }

    /**
     * sets parent for current node
     * @param {XsNode} parent 
     * @returns {this}
     */
    setParent(parent: XsNode): this {
        if (!parent || !(parent instanceof XsNode)) return this
        this._parent = parent; return this
    }

    /**
     * sets a whole tree object inside XsNode in order to have access to tree methods
     * @param {XsTree} tree 
     * @returns {this}
     */
    setTree(tree: XsTree): this {
        this._tree = tree
        this.children.forEach(c => c.setTree(tree))
        return this
    }
    /////////////////////////////////////////////

    /** 
     * checks if node has any children at all or any children of nodetype, if represented
     * @param {TagType} nodetype node type to be checkd
     * @returns {number} it return 0 if node does not have any children or any children of nodeType, if represented
     * */
    hasChildren(nodetype?: TagType): number {
        if (nodetype)
            return this._children.filter(c => c._tag === nodetype).length;
        return this._children.length
    }

    getChildren<T extends XsNode>(tagType?: TagType): Array<T> {
        if (!tagType)
            return this._children as Array<T>;
        return this._children.filter(c => c.Tag === tagType) as Array<T>;
    }

    /** 
     * checks if node has any children except the given nodetype
     * @param {TagType} nodetype node type to be checkd
     * @returns it return 0 if node does not have any children except given nodetypr
     * */
    hasChildrenExcept(nodetype: TagType): number {
        return this._children.filter(c => c._tag !== nodetype).length;
    }

    areAllChildren(nodeType: TagType): boolean {
        return this._children.every(c => c._tag === nodeType);
    }




    /**
     * returns the first child, if given nodetype exists then first child whose node type matches with given node type
     * @param {TagType} nodeType 
     * @returns {T}
     */
    firstChild<T extends XsNode>(nodeType?: TagType): T {
        if (!nodeType) return this._children[0] as T;
        return this._children.find(c => c._tag === nodeType) as T;
    }

    /**
     * return an json object from the XsNdoe
     * @returns {Object}
     */
    toJson(): object {
        return {
            nodename: this._tag,
            attributes: this._attributes.toObject(),
            children: this._children.map(child => child.toJson())
        }
    }

    /**
     * returns a xml of the node
     * @returns {string}
     */
    toXml(tab: number = 0): string {
        const result: Array<string> = []
        const space = tab ? new Array(tab).fill('\t').join('') : ''
        if (!this.children.length)
            result.push(`${space}<${this.Tag} ${this.attribute.toText()} />`)
        else {
            result.push(`${space}<${this.Tag} ${this.attribute.toText()}>`)
            result.push(...this.children.map(c => c.toXml(tab + 1)))
            result.push(`${space}</${this.Tag}>`)
        }
        return result.join('\n')
    }

    traverseBF(callback: (node: XsNode) => void) {
        const arr: Array<XsNode> = [this]
        while (arr.length) {
            const node: XsNode = arr.shift() as XsNode
            arr.push(...node.children)
            callback(node)
        }
    }

    traverseDF(callback: (node: XsNode) => void) {
        const arr: Array<XsNode> = [this]
        while (arr.length) {
            const node: XsNode = arr.shift() as XsNode
            arr.unshift(...node.children)
            callback(node)
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////

    public static fromElement(node: Element, parent?: XsNode): XsNode {
        try {
            if (["#text", "#comment", "xs:minLength", "xs:maxLength"].includes(node.nodeName)) return undefined
            const result = factory(elementMapping[node.nodeName])
            result.setParent(parent)

            getAttrsAsMap(node).forEach((value, key) => result.setAttr(key, value))

            if (node.childNodes)
                Array.from(node.childNodes).forEach((child: Element) => {
                    result.add(XsNode.fromElement(child, result))
                });
            return result
        } catch (error) {
            console.log("XsNode.createXsNode | there is a problem in creating XsNode",
                node.nodeName, elementMapping[node.nodeName])
            throw error;
        }

    }

    /**
     * returns true if the node has not any children and it is called self-closed
     * @returns {boolean}
     */
    isSelfClosing(): boolean { return this._children.length > 0 ? false : true }
}