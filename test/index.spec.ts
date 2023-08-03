import { hello } from "../src/index";

test("hello", () => {
    expect(hello("hamid")).toEqual("Hello hamid");
});