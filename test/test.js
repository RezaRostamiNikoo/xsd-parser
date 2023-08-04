const Parser = require("../dist")
const { readFileSync } = require("fs")


const root = new Parser.XmlParser(readFileSync("test/IFC4x1.xsd", "utf-8")).parse()
console.log(root.toJson())
console.log(Array.from(Parser.XsNode.elements.keys()));