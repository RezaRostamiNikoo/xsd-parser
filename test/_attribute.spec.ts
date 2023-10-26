import { Parser } from "../dist";
import { readFileSync } from 'fs';


const ifcXML4 = readFileSync("test/_attribute.xsd", "utf-8")

describe("Attribute testing", () => {

    it("parse attributes", () => {
        // const p = new Parser(ifcXML4);
        // const tree = p.parse();

        // console.log(tree.NodeStorage);
    });

});