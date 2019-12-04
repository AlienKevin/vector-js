import { addVectors, negateVector } from "../src/vector";
import {toBeDeepCloseTo} from 'jest-matcher-deep-close-to';
expect.extend({toBeDeepCloseTo});

const v1 = [1, 2];
const v2 = [0, -3];
const v3 = [-0.23, -10.05];
const v4 = [-0.489, -98.999, 553];
const v5 = [3892, 844, 2389];
const v6 = [0, 0, -23.248];

describe("Test vector addition", () => {
    test("2 vector addition return components", () =>
        expect(addVectors([v1, v2], "com")).toEqual([1, -1])
    );
    test("2 vector addition return angles", () =>
        expect(addVectors([v1, v2], "ang")).toEqual({
            mag: Math.sqrt(2),
            dir: -45,
            dim: 2
        })
    );
    test("2 vector addition return components", () =>
        expect(addVectors([v4, v5], "com")).toBeDeepCloseTo([3891.51, 745.001, 2942], 2)
    );
    test("3 vector addition return components", () =>
        expect(addVectors([v1, v2, v3], "com")).toEqual([0.77, -11.05])
    );
    test("3 vector addition return angles", () =>
        expect(addVectors([v1, v2, v3], "ang")).toEqual({
            mag: Math.sqrt(0.77**2 + 11.05**2),
            dir: -86.01388695010866,
            dim: 2
        })
    );
    test("3 vector addition return components", () =>
        expect(addVectors([v4, v5, v6], "com")).toBeDeepCloseTo([3891.51, 745.001, 2918.752], 2)
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
    test("1 vector negation return components", () =>
        expect(negateVector(v4)).toEqual([0.489, 98.999, -553])
    )
    test("1 vector negation return angles", () =>
        expect(negateVector(v1, "ang")).toBeDeepCloseTo({
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
        expect(negateVector(v3, "ang")).toBeDeepCloseTo({
            mag: 10.0526315,
            dir: 88.68898215432604,
            dim: 2
        }, 5)
    )
})
