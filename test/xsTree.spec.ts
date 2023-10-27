import { XsTree } from '../src'
import { readFileSync } from 'fs'
import { DOMParser } from '@xmldom/xmldom'
import { writeFileSync } from 'fs'
import { ITsEnumSchema } from '../src/typescriptDefinitions'

export class Converter {

    private _text: string
    private _tree: xsdParser.XsTree

    get tree(): xsdParser.XsTree { return this._tree }
    /**
     * 
     * @param {string} ifc_xsd IFC XSD file as string
     */
    constructor(ifc_xsd: string) {

        this._text = ifc_xsd

        this._tree = new xsdParser.Parser(this._text).parse()


    }

    exportSimpleTypes(): string {

        const result: Array<string> = []

        const sts = this.tree.getAllInstance("xs:simpleType").filter(s => s.attribute.name) as Array<xsdParser.XsSimpleTypeNode>

        sts.forEach(sn => {
            const schema = sn.getTsSchema()

            if (schema.type === "enum") {
                const def: ITsEnumSchema = schema.definition as ITsEnumSchema
                if (def.usage === "definition") {
                    const t = new EnumGenerator(def.reference)
                    t.Modifiers.export()
                    def.items.forEach(e => t.addMember(e.toUpperCase().replace(/-/, '_')))
                    result.push(new Writer(t.generate()).print())

                }
            }
        })

        return result.join('\n\n')

    }

}

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