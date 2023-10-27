import { XsTree } from '../src'
import { readFileSync } from 'fs'
import { DOMParser } from '@xmldom/xmldom'
import { writeFileSync } from 'fs'

describe("XsTree Test File", () => {


    test('should parse an Element to a tree', () => {

        const text = readFileSync('./test/files/IFC4x1.xsd', "utf-8")
        const document = new DOMParser().parseFromString(text)
        const tree = XsTree.fromElement(document.documentElement)

        expect(tree.rootNode.getAttr("xmlns:xs")).toEqual("http://www.w3.org/2001/XMLSchema")

        expect(tree.rootNode.firstChild("xs:element").attribute.toObject())
            .toEqual({ "abstract": "true", "name": "uos", "type": "ifc:uos" })

        expect(tree.rootNode.firstChild().Parent.Tag).toEqual("xs:schema")

        expect(tree.rootNode.firstChild("xs:simpleType").firstChild().Tag).toEqual("xs:list")

        writeFileSync('./test/result/test.xml', tree.rootNode.toXml())
    })


})