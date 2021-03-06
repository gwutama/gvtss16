/**
 * @param element Dom element, must be a canvas element.
 * @constructor
 * @author Galuh Utama <galuh.utama@gwutama.de>
 * @date 2016-05-16
 */
var ParametricArea = function(element) {
    this.element = element;
    this.vertices =  null;
    this.indices =  null;
    this.colors =  null;

    this.gl = this.element.getContext("experimental-webgl");
    this.init();
    this.generateVertices();
    this.draw();
    this.render();
};


ParametricArea.prototype.generateVertices = function() {
    var n = 32;

    this.vertices =  new Float32Array(3 * (n + 1));
    this.indices =  new Uint16Array(n + 1);

    for(var i = 0; i <= n; i++) {
        var u = i * Math.PI/n;
        var v = (i * Math.PI)/(n/2) - Math.PI;
        var a = 5;

        var x = Math.cos(u);
        var y = Math.cos(v);
        var z = Math.sin(a * Math.sin(u) * Math.sin(v));

        // Set vertex positions.
        this.vertices[i * 3] = x;
        this.vertices[i * 3 + 1] = y;
        this.vertices[i * 3 + 2] = z;

        // Set index.
        this.indices[i] = i;
    }
};


/**
 * Setup GL (background color, shaders, etc).
 */
ParametricArea.prototype.init = function() {
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.frontFace(this.gl.CCW);

    // Vertex shader
    var vsSource =
        "attribute vec3 pos;" +
        "attribute vec4 col;" +
        "varying vec4 color;" +
        "void main() {" +
        "color = col;" +
        "gl_Position = vec4(pos * 0.5, 1);" +
        "}";
    var vs = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vs, vsSource);
    this.gl.compileShader(vs);

    // Fragment shader
    var fsSource =
        "precision mediump float;" +
        "varying vec4 color;" +
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


/**
 * Initialize VBO and IBO to draw vertices and colors.
 */
ParametricArea.prototype.draw = function() {
    // Setup VBO for pos
    var vbo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW);
    var posAttrib = this.gl.getAttribLocation(this.prog, "pos");
    this.gl.vertexAttribPointer(posAttrib, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(posAttrib);

    // Setup VBO for col
/*    var vboCol = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vboCol);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, ParametricArea.colors, this.gl.STATIC_DRAW);
    var colAttrib = this.gl.getAttribLocation(this.prog, "col");
    this.gl.vertexAttribPointer(colAttrib, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(colAttrib);*/

    // Setup IBO
    this.ibo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ibo);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indices, this.gl.STATIC_DRAW);
};


/**
 * Render the scene on canvas.
 */
ParametricArea.prototype.render = function() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawElements(this.gl.LINE_STRIP, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
};


////////////////////////////////////////////////////////////////////////////////////
// Page Module
////////////////////////////////////////////////////////////////////////////////////


/**
 * This is the page module for the application.
 */
var page = (function() {
    function init() {
        new ParametricArea(document.getElementById("canvas"));
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