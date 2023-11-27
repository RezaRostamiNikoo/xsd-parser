import * as ts from 'write-ts'
import { XsComplexTypeNode, XsElementNode, XsGroupNode, XsSimpleTypeNode, XsTree } from './node'
import { Parser } from './parser'
import { ComplexDefType, GroupDefType, SimpleDefType } from './types'
import { TypeNode, TypeReferenceNode } from 'typescript'

export class Converter {

    private _text: string
    private _tree: XsTree

    get tree(): XsTree { return this._tree }

    /**
     * 
     * @param {string} ifc_xsd IFC XSD file as string
     */
    constructor(ifc_xsd: string) {

        this._text = ifc_xsd

        this._tree = new Parser(this._text).parse()


    }

    convertBuiltIn(): string {
        const result: Array<string> = []

        this.tree.NodeStorage.primitives.forEach((value, key) => {

            const t = new ts.TypeGenerator(value.identifier)
            let literal;
            if (value.defType === 'type')
                literal = value.type
            else
                literal = ts.createArrayTypeNode(value.type)

            t.Modifiers.export()
            t.setType(literal)
            result.push(new ts.Writer(t.generate()).print())
        })

        return result.join('\n\n')
    }

    exportGroupTypes(): string {

        const result: Array<string> = []

        this.tree
            .getAllInstance<XsGroupNode>('xs:group')
            .filter(g => g.attribute.name)
            .forEach(gn => {
                const t = new ts.TypeGenerator(gn.attribute.name)
                t.Modifiers.export()
                t.setType(gn.getDefinition().type)
                result.push(new ts.Writer(t.generate()).print())
            })

        return result.join('\n\n')

    }


    exportSimpleTypes(): string {

        const result: Array<string> = []

        this.tree
            .getAllInstance<XsSimpleTypeNode>('xs:simpleType')
            .filter(s => s.attribute.name)
            .forEach(sn => {
                const schema = sn.getDefinition()
                if (schema.defType === 'enum')
                    result.push(sn.toEnum().toString())
                else
                    result.push(sn.toClass().toString())
            })

        return result.join('\n\n')
    }

    exportComplexTypes(): string {
        const result: Array<string> = []
        this.tree
            .getAllInstance<XsComplexTypeNode>('xs:complexType')
            .forEach(cn => {
                if (!cn.attribute.name) return // should have a name
                result.push(cn.toClass().toString())
            })

        return result.join('\n\n')
    }

    exportElementComplexType(): string {
        const result: Array<string> = []
        this.tree
            .rootNode
            .getChildren<XsElementNode>('xs:element')
            // .getAllInstance<XsElementNode>('xs:element')
            .forEach(en => {
                if (!en.attribute.name || en.hasChildren() !== 1 || en.hasChildren("xs:complexType") !== 1) return // should have a name
                const c = new ts.TypeGenerator(en.attribute.name)
                const schema = en.getDefinition()
                c.Modifiers.export()
                c.setType(schema.type)
                result.push(new ts.Writer(c.generate()).print())
            })

        return result.join('\n\n')
    }



    complexDefToLiteral(type: ComplexDefType) {
        if (type.identifier) throw new Error("Converter.complexDefToLiteral | problem")
        const result = new ts.TypeLiteralGenerator()

        // type.attributes?.forEach()
    }


}

