import { addVectors, negateVector, subtractVectors, Vector } from "../src/vector";
import {toBeDeepCloseTo} from 'jest-matcher-deep-close-to';
expect.extend({toBeDeepCloseTo});

const v1 = [1, 2];
const v2 = [0, -3];
const v3 = [-0.23, -10.05];
const v4 = [-0.489, -98.999, 553];
const v5 = [3892, 844, 2389];
const v6 = [0, 0, -23.248];
const v1a: Vector = {
    mag: Math.sqrt(5),
    dir: 63.4349488,
    dim: 2
};
const v2a: Vector = {
    mag: 3,
    dir: -90,
    dim: 2
};
const v3a: Vector = {
    mag: Math.sqrt(0.23**2 + 10.05**2),
    dir: -91.31101784567394,
    dim: 2
};

describe("Test vector addition", () => {
    test("com + com addition return components", () =>
        expect(addVectors([v1, v2], "com")).toEqual([1, -1])
    );
    test("ang + ang addition return components", () =>
        expect(addVectors([v1a, v2a], "com")).toBeDeepCloseTo([1, -1], 5)
    );
    test("ang + com return components", () =>
        expect(addVectors([v1a, v2], "com")).toBeDeepCloseTo([1, -1], 5)
    );
    test("com + ang return components", () =>
        expect(addVectors([v1, v2a], "com")).toBeDeepCloseTo([1, -1], 5)
    );

    test("com + com addition return components", () =>
        expect(addVectors([v1, v3], "com")).toBeDeepCloseTo([0.77, -8.05], 5)
    );
    test("ang + ang addition return components", () =>
        expect(addVectors([v1a, v3a], "com")).toBeDeepCloseTo([0.77, -8.05], 5)
    );
    test("ang + com return components", () =>
        expect(addVectors([v1a, v3], "com")).toBeDeepCloseTo([0.77, -8.05], 5)
    );
    test("com + ang return components", () =>
        expect(addVectors([v1, v3a], "com")).toBeDeepCloseTo([0.77, -8.05], 5)
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
        expect(negateVector(v1a)).toBeDeepCloseTo([-1, -2], 5)
    )
    test("1 vector negation return components", () =>
        expect(negateVector(v2)).toEqual([0, 3])
    )
    test("1 vector negation return components", () =>
        expect(negateVector(v2a)).toEqual([0, 3])
    )
    test("1 vector negation return components", () =>
        expect(negateVector(v3)).toEqual([0.23, 10.05])
    )
    test("1 vector negation return components", () =>
        expect(negateVector(v3a)).toBeDeepCloseTo([0.23, 10.05], 5)
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

describe("Test vector subtraction", () => {
    test("com - com", () =>
        expect(subtractVectors(v1, v2)).toEqual([1, 5])
    )
    test("com - ang", () =>
        expect(subtractVectors(v1, v1a)).toBeDeepCloseTo([0, 0], 5)
    )
    test("ang - com", () =>
        expect(subtractVectors(v1a, v2)).toBeDeepCloseTo([1, 5], 5)
    )
    test("ang - ang", () =>
        expect(subtractVectors(v1a, v1a)).toBeDeepCloseTo([0, 0], 5)
    )
})
