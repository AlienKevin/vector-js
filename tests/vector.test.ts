import { addVectors } from "../src/vector";

const v1 = [1, 2];
const v2 = [0, -3];

describe("Test vector addition", () => {
    test("vector addition return components", () =>
        expect(addVectors([v1, v2], "com")).toEqual([1, -1])
    );
    test("vector addition return angles", () =>
        expect(addVectors([v1, v2], "ang")).toEqual({
            mag: Math.sqrt(2),
            dir: -45,
            dim: 2
        })
    );
});
