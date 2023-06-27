"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
var Token = /** @class */ (function () {
    function Token(name, cursor, line, type) {
        this.name = name;
        this.cursor = cursor;
        this.line = line;
        this.type = type;
    }
    return Token;
}());
exports.Token = Token;
