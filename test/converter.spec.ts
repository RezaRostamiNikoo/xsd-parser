import { Converter } from '../src'
import { readFileSync, writeFileSync, rmSync, existsSync } from 'fs'

describe("Test file for converter", () => {

    test('should first', () => {
        const resultPath = 'test/result/test.ts'
        if (existsSync(resultPath)) rmSync(resultPath)
        const text = readFileSync('test/files/IFC4x1.xsd', 'utf-8')
        // const text = readFileSync('test/files/ifcXML4.xsd', 'utf-8')

        const c = new Converter(text)

        const generatedText = [
            c.convertBuiltIn(),
            c.exportSimpleTypes(),
            c.exportGroupTypes(),
            c.exportComplexTypes(),
            c.exportElementComplexType()
        ]
        writeFileSync(resultPath, generatedText.join('\n\n\n\n'))

    })
})