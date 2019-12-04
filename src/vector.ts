type Vector = VectorAng | VectorCom;

// angular vector
type VectorAng = VectorAng1 | VectorAng2 | VectorAng3;

// one dimensional vector
type Dir1 = 1 | -1;
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
    // already decomposed
    if (Array.isArray(v)) {
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

function angularizeVector(v: VectorCom): VectorAng {
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
            mag: Math.sqrt(v[0]^2 + v[1]^2),
            dir: atan2(v[1], v[0]),
            dim: 2
        }
    } else if (v.length === 3) {
        return {
            mag: Math.sqrt(v[0]^2 + v[1]^2 + v[2]^2),
            dir: [atan2(v[1], v[0]), atan2(v[2], Math.sqrt(v[0]^2 + v[1]^2))],
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

function addVectors(vectors: Vector[], resultForm: "ang" | "com"): Vector {
    const sumVector = addVectorComs(vectors.map(decomposeVector));
    return (
        resultForm === "ang"
        ? angularizeVector(sumVector)
        : sumVector
    );
}

function sign(num: number): 1 | -1 {
    return (
        num >= 0
        ? 1
        : -1
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

export {
    addVectors
};
