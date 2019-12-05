import { addVectors, negateVector, subtractVectors, Vector } from "../src/vector";
import {toBeDeepCloseTo} from 'jest-matcher-deep-close-to';
expect.extend({toBeDeepCloseTo});

// 1d vectors
const v1d1 = [4.4782];
const v1d1a: Vector = {
    mag: 4.4782,
    dir: 1,
    dim: 1
};
const v1d2 = [-0.25789];
const v1d2a: Vector = {
    mag: 0.25789,
    dir: -1,
    dim: 1
};
const v1d3 = [0];
const v1d3a: Vector = {
    mag: 0,
    dir: 1,
    dim: 1
}

// 2d vectors
const v1 = [1, 2];
const v2 = [0, -3];
const v3 = [-0.23, -10.05];
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

// 3d vectors
const v4 = [-0.489, -98.999, 553];
const v5 = [3892, 844, 2389];
const v6 = [0, 0, -23.248];
const v4a: Vector = {
    mag: 561.7918129716737,
    dir: [-90.283006983163, 79.85020764914537],
    dim: 3
}
const v5a: Vector = {
    mag: 4644.062984069014,
    dir: [12.235433909933024, 30.958710965867475],
    dim: 3
}
const v6a: Vector = {
    mag: 23.248,
    dir: [0, -90],
    dim: 3
}

describe("Test vector addition", () => {

    describe("1d vector addition", () => {
        test("com + com", () =>
            expect(addVectors([v1d1, v1d2])).toEqual([4.22031])
        );
        test("ang + ang", () =>
            expect(addVectors([v1d1a, v1d2a])).toBeDeepCloseTo([4.22031], 5)
        );
        test("ang + com", () =>
            expect(addVectors([v1d1a, v1d2])).toBeDeepCloseTo([4.22031], 5)
        );
        test("com + ang", () =>
            expect(addVectors([v1d1, v1d2a])).toBeDeepCloseTo([4.22031], 5)
        );
        test("0 com + 0 com", () =>
            expect(addVectors([v1d3, v1d3])).toEqual([0])
        );
        test("0 ang + 0 ang", () =>
            expect(addVectors([v1d3a, v1d3a])).toBeDeepCloseTo([0], 5)
        );
        test("0 ang + 0 com", () =>
            expect(addVectors([v1d3a, v1d3])).toBeDeepCloseTo([0], 5)
        );
    })

    describe("2d vector addition", () => {
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
        test("com + com + com return components", () =>
            expect(addVectors([v1, v2, v3], "com")).toEqual([0.77, -11.05])
        );
        test("com + com + com return angles", () =>
            expect(addVectors([v1, v2, v3], "ang")).toEqual({
                mag: Math.sqrt(0.77**2 + 11.05**2),
                dir: -86.01388695010866,
                dim: 2
            })
        );
    });

    describe("3d vector addition", () => {
        test("3d com + com return components", () =>
            expect(addVectors([v4, v5], "com")).toBeDeepCloseTo([3891.51, 745.001, 2942], 2)
        );
        test("3d ang + com return components", () =>
            expect(addVectors([v4a, v5], "com")).toBeDeepCloseTo([3891.51, 745.001, 2942], 2)
        );
        test("3d com + ang return components", () =>
            expect(addVectors([v4, v5a], "com")).toBeDeepCloseTo([3891.51, 745.001, 2942], 2)
        );
        test("3d ang + ang return components", () =>
            expect(addVectors([v4a, v5a], "com")).toBeDeepCloseTo([3891.51, 745.001, 2942], 2)
        );
        
        test("3d com + com + com return components", () =>
            expect(addVectors([v4, v5, v6], "com")).toBeDeepCloseTo([3891.51, 745.001, 2918.752], 2)
        );
        test("3d ang + com + com return components", () =>
            expect(addVectors([v4a, v5, v6], "com")).toBeDeepCloseTo([3891.51, 745.001, 2918.752], 2)
        );
        test("3d ang + com + ang return components", () =>
            expect(addVectors([v4a, v5, v6a], "com")).toBeDeepCloseTo([3891.51, 745.001, 2918.752], 2)
        );
        test("3d ang + ang + ang return components", () =>
            expect(addVectors([v4a, v5a, v6a], "com")).toBeDeepCloseTo([3891.51, 745.001, 2918.752], 2)
        );
    });
});

describe("Negate one vector", () => {
    test("com negation return components", () =>
        expect(negateVector(v1)).toEqual([-1, -2])
    )
    test("ang negation return components", () =>
        expect(negateVector(v1a)).toBeDeepCloseTo([-1, -2], 5)
    )
    test("com negation return components", () =>
        expect(negateVector(v2)).toEqual([0, 3])
    )
    test("ang negation return components", () =>
        expect(negateVector(v2a)).toEqual([0, 3])
    )
    test("com negation return components", () =>
        expect(negateVector(v3)).toEqual([0.23, 10.05])
    )
    test("ang negation return components", () =>
        expect(negateVector(v3a)).toBeDeepCloseTo([0.23, 10.05], 5)
    )
    test("3d com negation return components", () =>
        expect(negateVector(v4)).toEqual([0.489, 98.999, -553])
    )
    test("3d ang negation return components", () =>
        expect(negateVector(v4a)).toBeDeepCloseTo([0.489, 98.999, -553], 5)
    )
    test("3d com negation return components", () =>
        expect(negateVector(v5)).toEqual([-3892, -844, -2389])
    )
    test("3d ang negation return components", () =>
        expect(negateVector(v5a)).toBeDeepCloseTo([-3892, -844, -2389], 5)
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

    test("3d com - com", () =>
        expect(subtractVectors(v4, v5)).toEqual([-3892.489, -942.999, -1836])
    )
    test("3d com - ang", () =>
        expect(subtractVectors(v4, v5a)).toBeDeepCloseTo([-3892.489, -942.999, -1836], 5)
    )
    test("3d ang - com", () =>
        expect(subtractVectors(v4a, v5)).toBeDeepCloseTo([-3892.489, -942.999, -1836], 5)
    )
    test("3d ang - ang", () =>
        expect(subtractVectors(v4a, v5a)).toBeDeepCloseTo([-3892.489, -942.999, -1836], 5)
    )
})
