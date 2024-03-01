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
exports.TCamara = void 0;
var entidad_1 = require("./entidad");
var TCamara = /** @class */ (function (_super) {
    __extends(TCamara, _super);
    function TCamara() {
        var _this = _super.call(this) || this;
        // Por defecto: cámara perspectiva
        _this.esPerspectiva = true;
        _this.cercano = 0.1;
        _this.lejano = 1000.0;
        return _this;
    }
    TCamara.prototype.setPerspectiva = function (cercano, lejano) {
        this.esPerspectiva = true;
        this.cercano = cercano;
        this.lejano = lejano;
    };
    TCamara.prototype.setParalela = function (cercano, lejano) {
        this.esPerspectiva = false;
        this.cercano = cercano;
        this.lejano = lejano;
    };
    TCamara.prototype.dibujar = function (matriz) {
        console.log("Configurando c\u00E1mara ".concat(this.esPerspectiva ? 'perspectiva' : 'paralela', " con planos ").concat(this.cercano, " - ").concat(this.lejano));
        // Implementación específica del dibujo o configuración de la cámara
    };
    return TCamara;
}(entidad_1.TEntidad));
exports.TCamara = TCamara;
