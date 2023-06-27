"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOSERS = exports.CLOSEABLES = exports.TT = exports.EnvTypes = exports.MATH_ENV_NAMES = exports.SKIP_ENV_NAMES = exports.REG_TEXT = exports.REG_SPECIAL = exports.REG_CMDSPACE = exports.REG_CMDNAME = exports.REG_TEXT_CHAR = void 0;
// Regex: If at backslash, get the next command 
exports.REG_TEXT_CHAR = /^[a-z]/ig; // Single character command
exports.REG_CMDNAME = /^[a-z]+(\*)?/ig; // Get entire name 
exports.REG_CMDSPACE = /^(\s)*(\n)?(\s)*/ig;
// Regex: general LaTeX special characters: https://www.dickimaw-books.com/latex/novices/html/symbols.html
exports.REG_SPECIAL = /^[{}%&$#_^~\[\]\\]/g;
// Regex: Anything but the special chars
exports.REG_TEXT = /^(([^\[\]{}%&$#_^~\\])|(\\[\[\]{}%&$#_^~\\]))+/g;
// Borrowed from TexSoup :3
exports.SKIP_ENV_NAMES = ['lstlisting', 'verbatim', 'verbatimtab', 'Verbatim', 'listing'];
exports.MATH_ENV_NAMES = [
    'align', 'align*', 'alignat', 'array', 'displaymath', 'eqnarray',
    'eqnarray*', 'equation', 'equation*', 'flalign', 'flalign*', 'gather',
    'gather*', 'math', 'multline', 'multline*', 'split'
];
// Enum for the LaTeX environment modes
var EnvTypes;
(function (EnvTypes) {
    EnvTypes[EnvTypes["TextMode"] = 0] = "TextMode";
    EnvTypes[EnvTypes["MathMode"] = 1] = "MathMode";
    EnvTypes[EnvTypes["TabbingMode"] = 2] = "TabbingMode";
    EnvTypes[EnvTypes["CommandMode"] = 3] = "CommandMode";
})(EnvTypes = exports.EnvTypes || (exports.EnvTypes = {}));
var TT;
(function (TT) {
    TT[TT["None"] = 0] = "None";
    TT[TT["Command"] = 1] = "Command";
    TT[TT["Definition"] = 2] = "Definition";
    TT[TT["Comment"] = 3] = "Comment";
    TT[TT["BreakLine"] = 4] = "BreakLine";
    TT[TT["Backslash"] = 5] = "Backslash";
    TT[TT["Escaped"] = 6] = "Escaped";
    TT[TT["Special"] = 7] = "Special";
    // Closeables
    TT[TT["EnvOpen"] = 8] = "EnvOpen";
    TT[TT["GroupOpen"] = 9] = "GroupOpen";
    TT[TT["OptionalOpen"] = 10] = "OptionalOpen";
    TT[TT["DollarOpen"] = 11] = "DollarOpen";
    TT[TT["DoubleDollarOpen"] = 12] = "DoubleDollarOpen";
    TT[TT["SquareMathOpen"] = 13] = "SquareMathOpen";
    TT[TT["EnvClose"] = 14] = "EnvClose";
    TT[TT["GroupClose"] = 15] = "GroupClose";
    TT[TT["OptionalClose"] = 16] = "OptionalClose";
    TT[TT["DollarClose"] = 17] = "DollarClose";
    TT[TT["DoubleDollarClose"] = 18] = "DoubleDollarClose";
    TT[TT["SquareMathClose"] = 19] = "SquareMathClose";
})(TT = exports.TT || (exports.TT = {}));
// Stuff that needs to be closed once opened
exports.CLOSEABLES = [TT.EnvOpen, TT.GroupOpen, TT.OptionalOpen, TT.DollarOpen, TT.DoubleDollarOpen, TT.SquareMathOpen];
// Stuff that closes the above
exports.CLOSERS = [TT.EnvClose, TT.GroupClose, TT.OptionalClose, TT.DollarClose, TT.DoubleDollarClose, TT.SquareMathClose];
