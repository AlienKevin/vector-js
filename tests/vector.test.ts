import { addVectors } from "../src/vector";

const v1 = [1, 2];
const v2 = [0, -3];
const v3 = [-0.23, -10.05]

describe("Test vector addition", () => {
    test("2 vector addition return components", () =>
        expect(addVectors([v1, v2], "com")).toEqual([1, -1])
    );
    test("3 vector addition return components", () =>
        expect(addVectors([v1, v2, v3], "com")).toEqual([0.77, -11.05])
    );
    test("2 vector addition return angles", () =>
        expect(addVectors([v1, v2], "ang")).toEqual({
            mag: Math.sqrt(2),
            dir: -45,
            dim: 2
        })
    );
    test("3 vector addition return angles", () =>
        expect(addVectors([v1, v2, v3], "ang")).toEqual({
            mag: Math.sqrt(0.77**2 + 11.05**2),
            dir: -86.01388695010866,
            dim: 2
        })
    );
});
