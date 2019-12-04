import { addVectors, negateVector } from "../src/vector";
import {toMatchCloseTo} from 'jest-matcher-deep-close-to';
expect.extend({toMatchCloseTo});

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

describe("Negate one vector", () => {
    test("1 vector negation return components", () =>
        expect(negateVector(v1)).toEqual([-1, -2])
    )
    test("1 vector negation return components", () =>
        expect(negateVector(v2)).toEqual([0, 3])
    )
    test("1 vector negation return components", () =>
        expect(negateVector(v3)).toEqual([0.23, 10.05])
    )
    test("1 vector negation return angles", () =>
        expect(negateVector(v1, "ang")).toMatchCloseTo({
            mag: 2.23607,
            dir: -116.56505,
            dim: 2
        }, 5)
    )
    test("1 vector negation return angles", () =>
        expect(negateVector(v2, "ang")).toEqual({
            mag: 3,
            dir: 90,
            dim: 2
        })
    )
    test("1 vector negation return angles", () =>
        expect(negateVector(v3, "ang")).toMatchCloseTo({
            mag: 10.0526315,
            dir: 88.68898215432604,
            dim: 2
        }, 5)
    )
})
