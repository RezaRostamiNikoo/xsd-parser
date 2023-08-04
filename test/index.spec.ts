import { hello } from "../src/index";
import { XsNode } from "../src/node/XsNode";
import { XmlParser } from "../src/xmlparser";
import { readFileSync } from "fs";

jest.mock('../src/node/XsNode'); // SoundPlayer is now a mock constructor

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    XsNode.mockClear();
});


it("hello", () => {
    new XmlParser(readFileSync("public/IFC4x1.xsd", "utf-8")).parse()
});