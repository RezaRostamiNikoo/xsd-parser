import { DOMParser } from "@xmldom/xmldom";

import merge from "lodash/merge";
import deepMerge from "deepmerge";
import { RootNode } from "./node/RootNode";


export class Parser {

    constructor(private text: string) {
    }

    /**
     * 
     * @returns {RootNode} it return a RootNode
     */
    parse(): RootNode {
        const parser = new DOMParser();
        const document = parser.parseFromString(this.text);
        const root: RootNode = new RootNode();
        root.setNode(document.documentElement);
        return root;
    }

    attributesOf(tag: string) {
        const parser = new DOMParser();
        const document = parser.parseFromString(this.text);
        console.log(`Attrs for ${tag}`, JSON.stringify(this.getAnTagAllAttributes(document.documentElement, tag)));
        console.log(`Children for ${tag}`, JSON.stringify(this.getAnTagAllChildren(document.documentElement, tag)));
    }
    listOfTags(): Set<string> {
        const parser = new DOMParser();
        const document = parser.parseFromString(this.text);
        return this.getListOfTags(document.documentElement);
    }
    private getChildren(node: Node): Array<ChildNode> {
        if (!node.childNodes) return [];
        return Array.from(node.childNodes);
    }

    private getDefinitions(node: Node): { [key: string]: Object } {
        const result = {};
        this.getChildren(node).forEach(child => {
            if (!result[child.nodeName]) {
                result[child.nodeName] = this.getDefinitions(child);
            }
            else result[child.nodeName] = merge({}, result[child.nodeName], this.getDefinitions(child))
        })
        return result;
    }

    private getAnTagAllAttributes(node: Node, nodename: string) {
        let result = {
            "withChild": {},
            "withoutChild": {}
        };
        if (this.getChildren(node).length) {
            if (node.nodeName === nodename)
                result.withChild = this.getAttributes(node as Element)

            this.getChildren(node).forEach(child => {
                result = deepMerge(result, this.getAnTagAllAttributes(child, nodename),
                    {
                        arrayMerge: (target, source) => {
                            const result = new Set();
                            source.forEach(v => result.add(v));
                            target.forEach(v => result.add(v));
                            return Array.from(result);
                        }
                    });
            })
        } else if (node.nodeName === nodename)
            result.withoutChild = this.getAttributes(node as Element)
        return result;
    }

    private getAttributes(node: Element): Object {
        const result: { [key: string]: any } = {};
        for (let i = 0; i < node.attributes.length; i++) {
            const attr = node.attributes[i] as Attr;
            if (["name"].includes(attr.name))
                result[attr.name] = attr.value;
            else result[attr.name] = [attr.value];
        }
        return result;
    }

    private getAnTagAllChildren(node: Node, nodename: string) {
        let result = new Set();
        this.getChildren(node).forEach(child => {
            if (node.nodeName === nodename)
                result.add(child.nodeName);
            this.getAnTagAllChildren(child, nodename).forEach(v => result.add(v));
        })
        return Array.from(result);
    }

    /**
     * it return a set of tags that has been used in a document
     */
    private getListOfTags(node: Node): Set<string> {
        const result: Set<string> = new Set();
        this.getChildren(node).forEach(child => {
            result.add(child.nodeName);
            this.getListOfTags(child).forEach(tag => {
                result.add(tag);
            });
        })
        return result;
    }
}