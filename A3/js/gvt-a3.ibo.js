var MapleLeaf = function(element) {
    this.element = element;
    this.gl = this.element.getContext("experimental-webgl");
    this.init();
    this.draw();
    this.render();
};

MapleLeaf.vertices = new Float32Array([
    -0.1, -1.3,
    -0.1, -0.5,
    -0.8, -0.6,
    -0.7, -0.4,
    -1.5, 0.2,
    -1.25, 0.3,
    -1.4, 0.8,
    -1, 0.7,
    -0.9, 0.9,
    -0.5, 0.6,
    -0.6, 1.4,
    -0.3, 1.3,

    0, 1.8,

    0.3, 1.3,
    0.6, 1.4,
    0.5, 0.6,
    0.9, 0.9,
    1, 0.7,
    1.4, 0.8,
    1.25, 0.3,
    1.5, 0.2,
    0.7, -0.4,
    0.8, -0.6,
    0.1, -0.5,
    0.1, -1.3,
]);

MapleLeaf.indices = new Uint16Array([
    1,2,3,
    3,4,5,
    5,6,7,
    7,8,9,
    9,10,11,
    11,12,13,
    13,14,15,
    15,16,17,
    17,18,19,
    19,20,21,
    21,22,23,
    23,24,0,

    0,1,24,
    1,23,0,
    1,3,5,
    1,5,7,
    1,7,9,
    1,9,11,
    1,11,13,

    23,11,13,
    23,13,15,
    23,15,17,
    23,17,19,
    23,19,21,
]);

MapleLeaf.prototype.init = function() {
    this.gl.clearColor(1, 1, 1, 1);
    this.gl.frontFace(this.gl.CCW);

    // Vertex shader
    var vsSource =
        "attribute vec2 pos;" +
        "void main() {" +
            "gl_Position = vec4(pos * 0.5, 0, 1);" +
        "}";
    var vs = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vs, vsSource);
    this.gl.compileShader(vs);

    // Fragment shader
    // Fragment shader
    var fsSource =
        "void main() {" +
            "gl_FragColor = vec4(0,0,0,1);" +
        "}";
    var fs = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fs, fsSource);
    this.gl.compileShader(fs);

    this.prog = this.gl.createProgram();
    this.gl.attachShader(this.prog, vs);
    this.gl.attachShader(this.prog, fs);
    this.gl.linkProgram(this.prog);
    this.gl.useProgram(this.prog);
};

MapleLeaf.prototype.draw = function() {
    // Setup VBO
    var vbo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, MapleLeaf.vertices, this.gl.STATIC_DRAW);

    var posAttrib = this.gl.getAttribLocation(this.prog, "pos");
    this.gl.vertexAttribPointer(posAttrib, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(posAttrib);

    // Setup IBO
    this.ibo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ibo);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, MapleLeaf.indices, this.gl.STATIC_DRAW);
};

MapleLeaf.prototype.render = function() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawElements(this.gl.TRIANGLES, MapleLeaf.indices.length, this.gl.UNSIGNED_SHORT, 0);
};


var page = (function() {
    function init() {
        new MapleLeaf(document.getElementById("canvas"));
        console.log("Page initialized");
    }

    // Interface
    return {
        init: init
    };
}());


window.onload = function() {
    page.init();
};
