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
exports.TMalla = void 0;
var entidad_1 = require("./entidad");
var TMalla = /** @class */ (function (_super) {
    __extends(TMalla, _super);
    function TMalla(malla) {
        var _this = _super.call(this) || this;
        _this.malla = malla;
        return _this;
    }
    TMalla.prototype.dibujar = function (matriz) {
        console.log('Dibujando TMalla');
        // Implementación del método de dibujo usando 'matriz' y 'this.malla'
    };
    return TMalla;
}(entidad_1.TEntidad));
exports.TMalla = TMalla;
