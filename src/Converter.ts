import * as ts from 'write-ts'
import { XsComplexTypeNode, XsGroupNode, XsSimpleTypeNode, XsTree } from './node'
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
            if (value.type === 'type')
                literal = ts.createTypeReferenceNode(value.itemType)
            else
                literal = ts.createArrayTypeNode(ts.createTypeReferenceNode(value.itemType))

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
                t.setType(gn.toTypeNode())
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
                if (schema.type === 'enum')
                    result.push(sn.toEnum().toString())
                else
                    result.push( sn.toClass().toString())
            })

        return result.join('\n\n')

    }

    exportComplexTypes(): string {
        const result: Array<string> = []
        const literals = []
        this.tree
            .getAllInstance<XsComplexTypeNode>('xs:complexType')
            .forEach(cn => {
                if (!cn.attribute.name) return // should have a name

                const schema = cn.getDefinition()

                const complexType = new ts.ClassGenerator(cn.attribute.name)
                complexType.Modifiers.export()


                const mainLiteral = new ts.TypeLiteralGenerator() /////////////////////////////////////////////
                literals.push(mainLiteral)

                if (schema.complexContent) {
                    if (schema.complexContent.extension) {
                        const ext = schema.complexContent.extension
                        complexType.extends(ts.createIdentifier(ext.base))
                        //         const lt = new ts.TypeLiteralGenerator() /////////////////////////////////////////////
                        ext.attributes?.forEach(attr => {
                            complexType.addProperty(attr.name)
                                .setType(attr.type
                                    ? ts.createTypeReferenceNode(attr.type)
                                    : this.simpleDefToLiteral(attr.simpleType).generate()
                                )
                                .optional(attr.optional)
                        })

                        // ext.elements?.forEach(({ element, optional }) => {
                        //     complexType.addProperty(element.name)
                        //         .setType(element.primitiveType || element.type
                        //             ? ts.createTypeReferenceNode(element.primitiveType || element.type)
                        //             : this.complexDefToLiteral(element.complexType).generate()
                        //         )
                        //         .optional(optional)
                        // })
                    }
                    else if (schema.complexContent?.restriction) {
                        //         // c.extends(ts.createIdentifier(schema.complexContent?.extension?.base))
                        //         // schema.complexContent.extension.attributes?.forEach(attr => {
                        //         //     const p = c.addProperty(attr.name)
                        //         //         .setType(ts.createTypeReferenceNode(attr.type.itemType))
                        //         //     if (attr.optional) p.optional()
                        //         // })
                        //         // schema.complexContent.extension.elements?.forEach(({ element, optional }) => {
                        //         //     const p = c.addProperty(element.name)
                        //         //     if (element.primitiveType || element.type)
                        //         //         p.setType(ts.createTypeReferenceNode(element.primitiveType || element.type))
                        //         //     if (optional) p.optional()
                        //         // })
                    }
                }
                else if (schema.simpleContent?.extension) { // this just have extension tag as a child
                    const ext = schema.simpleContent?.extension
                    complexType.extends(ts.createIdentifier(ext.base))
                    schema.simpleContent.extension.attributes?.forEach(attr => { // this has just attribute as its children
                        complexType.addProperty(attr.name)
                            .setType(attr.type
                                ? ts.createTypeReferenceNode(attr.type)
                                : this.simpleDefToLiteral(attr.simpleType).generate()
                            )
                            .optional(attr.optional)
                    })
                }
                else {
                    schema.attributes?.forEach(attr => {
                        complexType.addProperty(attr.name)
                            .setType(attr.type
                                ? ts.createTypeReferenceNode(attr.type)
                                : this.simpleDefToLiteral(attr.simpleType).generate()
                            )
                            .optional(attr.optional)
                    })
                    // schema.seqences?.forEach(s => {
                    //     s.elements?.forEach(element => {
                    //         const p = c.addProperty(element.name)
                    //         if (element.primitiveType || element.type) {
                    //             p.setType(ts.createArrayTypeNode(ts.createTypeReferenceNode(element.primitiveType || element.type)))
                    //             // if (optional) p.optional()
                    //         } else if (element.complexType) {
                    //             // element.complexType.
                    //         }
                    //     })
                    // })

                    // schema.groups?.forEach(g => {
                    //     g.choices.elements?.forEach(element => {
                    //         const p = c.addProperty(element.name)
                    //         if (element.primitiveType || element.type)
                    //             p.setType(ts.createTypeReferenceNode(element.primitiveType || element.type))
                    //         // if (optional) p.optional()
                    //     })
                    // })
                }

                result.push(new ts.Writer(complexType.generate()).print())
            })

        return result.join('\n\n')
    }

    exportElementComplexType(): string {
        const result: Array<string> = []
        this.tree
            // .rootNode
            // .getChildren<XsComplexTypeNode>('xs:element')
            .getAllInstance<XsComplexTypeNode>('xs:element')
            .forEach(en => {
                if (!en.attribute.name || en.hasChildren() !== 1 || en.hasChildren("xs:complexType") !== 1) return // should have a name

                const cn = en.firstChild<XsComplexTypeNode>("xs:complexType")

                const schema = cn.getDefinition()

                const c = new ts.ClassGenerator(en.attribute.name)
                c.Modifiers.export()

                schema.attributes?.forEach(attr => {
                    const p = c.addProperty(attr.name)
                        .setType(ts.createTypeReferenceNode(attr.simpleType.itemType))
                    if (attr.optional) p.optional()
                })

                if (schema.complexContent?.extension) {
                    c.extends(ts.createIdentifier(schema.complexContent?.extension?.base))
                    schema.complexContent.extension.attributes?.forEach(attr => {
                        const p = c.addProperty(attr.name)
                            .setType(ts.createTypeReferenceNode(attr.simpleType.itemType))
                        if (attr.optional) p.optional()
                    })
                    schema.complexContent.extension.elements?.forEach(({ element, optional }) => {
                        const p = c.addProperty(element.name)
                        if (element.primitiveType || element.type)
                            p.setType(ts.createTypeReferenceNode(element.primitiveType || element.type))
                        if (optional) p.optional()

                    })
                }

                schema.seqences?.forEach(s => {
                    s.elements?.forEach(element => {
                        const p = c.addProperty(element.name)
                        if (element.primitiveType || element.type)
                            p.setType(ts.createTypeReferenceNode(element.primitiveType || element.type))
                        // if (optional) p.optional()
                    })
                })

                schema.groups?.forEach(g => {
                    g.choices.elements?.forEach(element => {
                        const p = c.addProperty(element.name)
                        if (element.primitiveType || element.type)
                            p.setType(ts.createTypeReferenceNode(element.primitiveType || element.type))
                        // if (optional) p.optional()
                    })
                })

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

