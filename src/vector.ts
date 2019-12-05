import {Decimal} from 'decimal.js';

type Num = number | Decimal

const PI = Decimal.acos(-1);

type Vector = VectorAng | VectorCom;

// vector form can be either angular or component
type VectorForm = "ang" | "com";
const defaultForm: VectorForm = "com";

// angular vector
type VectorAng = VectorAng1 | VectorAng2 | VectorAng3;

type Sign = 1 | -1;

// one dimensional vector
type Dir1 = Sign;
type VectorAng1 = {
    mag: number,
    dir: Dir1,
    dim: 1
}

// two dimensional vector
type Dir2 = number;
type VectorAng2 = {
    mag: number,
    dir: Dir2,
    dim: 2
}

// three dimensional vector
type Dir3 = [number, number];
type VectorAng3 = {
    mag: number,
    dir: Dir3,
    dim: 3
}

// component vector
type VectorCom = number[];

function decomposeVector(v: Vector): VectorCom {
    if (isVectorCom(v)) {
        return v;
    }
    if (v.dim === 1) {
        return [mulR(v.dir, v.mag)];
    } else if (v.dim === 2) {
        return [mulR(cos(v.dir), v.mag), mulR(sin(v.dir), v.mag)];
    } else {
        const xyMag = Math.abs(mulR(cos(v.dir[1]), v.mag));
        const z = mulR(sin(v.dir[1]), v.mag);
        return [
            mulR(cos(v.dir[0]), xyMag),
            mulR(sin(v.dir[0]), xyMag),
            z,
        ];
    }
}

function angularizeVector(v: Vector): VectorAng {
    if (!isVectorCom(v)) {
        return v;
    }

    if (v.length > 3) {
        throw new Error("Too many vector components, must be between 1 and 3.");
    }

    if (v.length < 1) {
        throw new Error("Empty vector is not allowed.");
    }

    if (v.length === 1) {
        return {
            mag: Math.abs(v[0]),
            dir: sign(v[0]),
            dim: 1
        }
    } else if (v.length === 2) {
        return {
            mag: sqrtR(sq(v[0]).add(sq(v[1]))),
            dir: atan2R(v[1], v[0]),
            dim: 2
        }
    } else if (v.length === 3) {
        return {
            mag: sqrtR(sq(v[0]).add(sq(v[1])).add(sq(v[2]))),
            dir: [atan2R(v[1], v[0]), atan2R(v[2], sqrtR(sq(v[0]).add(sq(v[1]))))],
            dim: 3
        }
    }

}

function addVectorComs(vectors: VectorCom[]): VectorCom {
    // ensure all vectors have the same dimension
    const allSameDim = vectors.every((v, index) =>
        index === 0 || vectors[index - 1].length === v.length
    )

    if (!allSameDim) {
        throw new Error("Not all vectors have the same dimension.");
    }

    return vectors.reduce((sumV, v) =>
        sumV.map((sum, index) =>
            addR(sum, v[index])
        )
    );
}

function addVectors(vectors: Vector[], form?: VectorForm): Vector {
    const sumVector = addVectorComs(vectors.map(decomposeVector));
    return formVector(sumVector, form);
}

function negateVector(v: Vector, form?: VectorForm): Vector {
    return formVector(
        isVectorCom(v)
        ? v.map((value) => negate(value))
        : (
            v.dim === 1
            ? {
                ...v,
                dir: negateSign(v.dir)
            }
            : (
                v.dim === 2
                ? {
                    ...v,
                    dir: lockDegrees(addR(v.dir,180))
                }
                : {
                    ...v,
                    dir: [lockDegrees(addR(v.dir[0], 180)), lockDegrees(addR(v.dir[1], 180))]
                }
            )
        ),
        form
    );
}

function subtractVectors(v1: Vector, v2: Vector, form?: VectorForm): Vector {
    return addVectors([v1, negateVector(v2)], form);
}

function formVector(v: Vector, form = defaultForm): Vector {
    return (
        form === "ang"
        ? angularizeVector(v)
        : decomposeVector(v)
    );
}

function isVectorCom(v: Vector): v is VectorCom {
    return Array.isArray(v);
}

function sign(num: number): Sign {
    return (
        num >= 0
        ? 1
        : -1
    )
}

function negateSign(sign: Sign): Sign {
    return (
        sign > 0
        ? -1
        : 1
    )
}

function negate(num: number): number {
    return (
        num === 0
        ? 0 // avoid -0
        : -num
    )
}

function toDegrees(angle: Num): Decimal {
    return new Decimal(angle).mul(new Decimal(180).div(PI));
}

function toRadians(angle: Num): Decimal {
    return new Decimal(angle).mul(PI.div(new Decimal(180)));
}

function sin(degrees: Num): Decimal {
    return Decimal.sin(toRadians(degrees))
}

function cos(degrees: Num): Decimal {
    return Decimal.cos(toRadians(degrees))
}

function atan2R(y: Num, x: Num): number {
    return toNumber(toDegrees(Decimal.atan2(y, x)));
}

// lock degrees within (-180, 180]
function lockDegrees(degrees: number) {
    const within0and360 = (degrees % 360);
    return (
        within0and360 > 180
        ? within0and360 - 360
        : within0and360
    );
}

function mulR(a: Num, b: Num): number {
    return binaryR(a, b, Decimal.mul.bind(Decimal));
}

function mul(a: Num, b: Num): Decimal {
    return binary(a, b, Decimal.mul);
}

function addR(a: Num, b: Num): number {
    return binaryR(a, b, Decimal.add.bind(Decimal));
}

function add(a: Num, b: Num): Decimal {
    return binary(a, b, Decimal.add);
}

function binaryR(a: Num, b: Num, func: ((a: Decimal, b: Decimal) => Decimal)): number {
    return toNumber(binary(a, b, func));
}

function binary(a: Num, b: Num, func: ((a: Decimal, b: Decimal) => Decimal)): Decimal {
    return func(new Decimal(a), new Decimal(b));
}

function sq(num: Num): Decimal {
    return Decimal.pow(new Decimal(num), new Decimal(2));
}

function sqrtR(num: Num): number {
    return toNumber(sqrt(num));
}

function sqrt(num: Num): Decimal {
    return Decimal.sqrt(new Decimal(num));
}

function toNumber(num: Decimal): number {
    return num.toDecimalPlaces(17).toNumber();
}

export {
    addVectors,
    negateVector,
    subtractVectors,
    Vector,
    decomposeVector,
    angularizeVector
};
