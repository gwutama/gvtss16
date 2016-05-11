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

    -0.1, -1.3
]);

MapleLeaf.numVertices = 26;

MapleLeaf.prototype.init = function() {
    this.gl.clearColor(0, 0, 0, 1);

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
    var fsSource =
        "void main() {" +
            "gl_FragColor = vec4(1);" +
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
    var vbo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, MapleLeaf.vertices, this.gl.STATIC_DRAW);

    var posAttrib = this.gl.getAttribLocation(this.prog, "pos");
    this.gl.vertexAttribPointer(posAttrib, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(posAttrib);
};

MapleLeaf.prototype.render = function() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.gl.LINE_STRIP, 0, MapleLeaf.numVertices);
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
