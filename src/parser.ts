import { DOMParser } from "@xmldom/xmldom";
import { XsTree } from "./node/XsTree";


export class Parser {

    constructor(private text: string) {
    }

    /**
     * parse IFCXSD file 
     * @returns {XsTree} it return a RootNode
     */
    parse(): XsTree {
        const document = new DOMParser().parseFromString(this.text);
        return XsTree.fromElement(document.documentElement)
    }
}