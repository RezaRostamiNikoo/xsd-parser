import { hello } from "../src/index";
import { XmlParser } from "../src/xmlparser";
import { readFileSync } from "fs";

test("RootNode", () => {
    const root = new XmlParser(readFileSync("public/IFC4x1.xsd", "utf-8")).parse()
    console.log(root.toJson())
});