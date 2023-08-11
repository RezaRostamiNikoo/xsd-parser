import { Parser } from "../dist";
import { readFileSync } from 'fs';


const ifcXML4 = readFileSync("test/ifcXML4.xsd", "utf-8")

describe("Parser class", () => {

    it("test the list of tags", () => {
        const p = new Parser(ifcXML4);
        console.log("List of tags: ", p.listOfTags());
    });


    it("test the tree", () => {
        const p = new Parser(ifcXML4);
        const tree = p.parse();
        console.log("tree", tree.toJson());
    });

});