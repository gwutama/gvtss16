var pyramid = ( function() {
    function createVertexData() {
        // Positions.
        this.vertices = new Float32Array([
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0,
             1.0, -1.0, -1.0,
            -1.0, -1.0, -1.0,
             0.0,  1.0,  0.0
        ]);

        // Normals.
        this.normals = new Float32Array([
            0.0,  0.0,  1.0,
            1.0,  0.0,  0.0,
            0.0,  0.0, -1.0,
            -1.0,  0.0,  0.0,
            0.0, -1.0,  0.0
        ]);

        this.indicesLines = new Uint16Array([
            0, 1,
            0, 4,
            1, 4,

            1, 2,
            1, 4,
            2, 4,

            2, 3,
            2, 4,
            3, 4,

            3, 0,
            3, 4,
            0, 4,

            3, 2,
            3, 1,
            2, 1
        ]);

        this.indicesTris = new Uint16Array([
            0, 1, 4,
            1, 2, 4,
            2, 3, 4,
            3, 0, 4,
            3, 2, 1,
            2, 1, 0
        ]);
    }

    return {
        createVertexData : createVertexData
    }

}());
