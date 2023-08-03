import { hello } from "../src/index";
import { XmlParser } from "../src/xmlparser";
import { readFileSync } from "fs";

test("hello", () => {
    new XmlParser(readFileSync("public/IFC4x1.xsd", "utf-8")).parse()
    expect(hello("hamid")).toEqual("Hello hamid");
});