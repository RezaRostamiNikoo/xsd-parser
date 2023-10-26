import { result } from 'lodash'
import { NodeStorage } from './NodeStorage'
import { XsNode } from "./XsNode"
import { TagType } from './types'

export class XsTree {
    public static _nodeStorage: NodeStorage = new NodeStorage()

    get NodeStorage(): NodeStorage { return XsTree._nodeStorage }

    private _rootNode: XsNode

    get rootNode(): XsNode { return this._rootNode }
    set rootNode(value: XsNode) { this._rootNode = value }

    constructor(rootNode?: XsNode) {
        if (rootNode) {
            this.rootNode = rootNode
            this.rootNode.setTree(this)
        }
    }

    setRootNode(value: XsNode): this {
        this.rootNode = value
        return this
    }

    traverseBF(callback: (node: XsNode) => void) {
        const arr: Array<XsNode> = [this._rootNode]
        while (arr.length) {
            const node: XsNode = arr.shift() as XsNode
            arr.push(...node.children)
            callback(node)
        }
    }

    traverseDF(callback: (node: XsNode) => void) {
        const arr = [this._rootNode]
        while (arr.length) {
            const node: XsNode = arr.shift() as XsNode
            arr.unshift(...node.children)
            callback(node)
        }
    }

    /**
     * it return a set of tags that has been used in the tree
     * @return {Set<string>}
     */
    private getListOfTags(): Set<string> {
        const result: Set<string> = new Set()
        this.traverseBF((node: XsNode) => result.add(node.Tag))
        return result
    }

    /**
     * returns all the instance of tag in the tree as an array
     * @param {TagType} nodeType 
     * @returns {Array<Xsnode>}
     */
    getAllInstance(nodeType: TagType): Array<XsNode> {
        const result: Array<XsNode> = []

        this.traverseBF(node => {
            if (node.Tag === nodeType) result.push(node)
        })

        return result
    }


    getAnTagAllAttributes(nodename: string) {
        // let result = {
        //     "withChild": {},
        //     "withoutChild": {}
        // }
        // if (this.getChildren(node).length) {
        //     if (node.nodeName === nodename)
        //         result.withChild = this.getAttributes(node as Element)

        //     this.getChildren(node).forEach(child => {
        //         result = deepMerge(result, this.getAnTagAllAttributes(child, nodename),
        //             {
        //                 arrayMerge: (target, source) => {
        //                     const result = new Set()
        //                     source.forEach(v => result.add(v))
        //                     target.forEach(v => result.add(v))
        //                     return Array.from(result)
        //                 }
        //             })
        //     })
        // } else if (node.nodeName === nodename)
        //     result.withoutChild = this.getAttributes(node as Element)
        // return result
    }


    getAnTagAllChildren(nodename: TagType): Array<TagType> {
        let result: Set<TagType> = new Set()
        this.traverseBF(node => {
            if (node.Parent.Tag === nodename) result.add(node.Tag)
        })
        return Array.from(result)
    }

    attributesOf(tag: string) {
        // const parser = new DOMParser()
        // const document = parser.parseFromString(this.text)
        // console.log(`Attrs for ${tag}`, JSON.stringify(this.getAnTagAllAttributes(document.documentElement, tag)))
        // console.log(`Children for ${tag}`, JSON.stringify(this.getAnTagAllChildren(document.documentElement, tag)))
    }

    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////

    public static fromElement(node: Element): XsTree {
        return new XsTree(XsNode.fromElement(node))
    }
}
