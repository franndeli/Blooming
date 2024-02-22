"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TLuz = void 0;
var gl_matrix_1 = require("gl-matrix");
var entidad_1 = require("./entidad");
var TLuz = /** @class */ (function (_super) {
    __extends(TLuz, _super);
    function TLuz(intensidad) {
        if (intensidad === void 0) { intensidad = gl_matrix_1.vec3.fromValues(1, 1, 1); }
        var _this = _super.call(this) || this;
        _this.intensidad = intensidad;
        return _this;
    }
    TLuz.prototype.setIntensidad = function (intensidad) {
        this.intensidad = intensidad;
    };
    TLuz.prototype.getIntensidad = function () {
        return this.intensidad;
    };
    TLuz.prototype.dibujar = function (matriz) {
        console.log('Aplicando luz con intensidad', this.intensidad);
        // Aquí podrías incluir la lógica para aplicar la luz usando la 'matriz'
        // pero esto dependerá de la implementación específica de tu motor gráfico.
    };
    return TLuz;
}(entidad_1.TEntidad));
exports.TLuz = TLuz;
