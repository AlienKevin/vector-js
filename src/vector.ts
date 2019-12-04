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
        return [v.dir * v.mag];
    } else if (v.dim === 2) {
        return [cos(v.dir) * v.mag, sin(v.dir) * v.mag];
    } else {
        const xyMag = cos(v.dir[1]) * v.mag;
        const zMag = sin(v.dir[1]) * v.mag;
        return [
            cos(v.dir[0]) * xyMag,
            sin(v.dir[0]) * xyMag,
            zMag,
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
            mag: Math.sqrt(v[0]**2 + v[1]**2),
            dir: atan2(v[1], v[0]),
            dim: 2
        }
    } else if (v.length === 3) {
        return {
            mag: Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2),
            dir: [atan2(v[1], v[0]), atan2(v[2], Math.sqrt(v[0]**2 + v[1]**2))],
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
            sum + v[index]
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
                    dir: lockDegrees(v.dir + 180)
                }
                : {
                    ...v,
                    dir: [lockDegrees(v.dir[0] + 180), lockDegrees(v.dir[1] + 180)]
                }
            )
        ),
        form
    );
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

function toDegrees(angle: number) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function sin(degrees: number) {
    return Math.sin(toRadians(degrees))
}

function cos(degrees: number) {
    return Math.cos(toRadians(degrees))
}

function atan2(y: number, x: number) {
    return toDegrees(Math.atan2(y, x));
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

export {
    addVectors,
    negateVector
};
