"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = void 0;
var definitions_1 = require("./definitions");
var token_1 = require("./token");
var Tokenizer = /** @class */ (function () {
    function Tokenizer(text, cursor, nestedIn) {
        if (cursor === void 0) { cursor = 0; }
        if (nestedIn === void 0) { nestedIn = definitions_1.TT.None; }
        this.cursor = 0; // The current position of our cursor in the given LaTeX document
        this.lineCursor = 0; // The current line position
        this.tokenStack = []; // The tokens we have already found
        this.returnTokenizer = false;
        this.cursor = cursor;
        this.text = text;
    }
    // Add a token to the stack
    Tokenizer.prototype.add_token = function (name, type, cursor, lineCursor) {
        if (cursor === void 0) { cursor = this.cursor; }
        if (lineCursor === void 0) { lineCursor = this.lineCursor; }
        var token = new token_1.Token(name, cursor, lineCursor, type);
        this.tokenStack.push(token);
    };
    // Routine if we stumble on a backslash
    Tokenizer.prototype.backslash_handler = function () {
        if (this.view(1).match(definitions_1.REG_CMDNAME)) { // Find name for command / definition etc. 
            var cmdName = this.view(1).match(definitions_1.REG_CMDNAME)[0];
            if (cmdName == "begin") {
                this.add_token(cmdName, definitions_1.TT.EnvOpen);
            }
            else if (cmdName == "end") {
                this.add_token(cmdName, definitions_1.TT.EnvClose);
            }
            else {
                this.add_token(cmdName, definitions_1.TT.Command);
            }
            this.cursor += cmdName.length;
        }
        else if (this.view(1).match(definitions_1.REG_SPECIAL)) { // Skip the special character, it's an escaped char.
            this.cursor += 1;
        }
        else if (this.next() == "[") { // Opening of square math mode
            this.add_token("[", definitions_1.TT.SquareMathOpen);
        }
        else if (this.next() == "]") { // Closing of square math mode
            this.add_token("]", definitions_1.TT.SquareMathClose);
        }
        else if (this.next().match(/^\s$/)) { // Single backslash without any function (maybe not needed?)
            this.add_token("\\", definitions_1.TT.Backslash);
        }
        else {
            this.add_token(this.next(), definitions_1.TT.Escaped); // Add scaped character
        }
    };
    // Routine if we stumble on a special character (besides \)
    Tokenizer.prototype.special_char_handler = function () {
        switch (this.text.charAt(this.cursor)) {
            case "%": { // Single line comment, ends when we enter a new line
                this.add_token("%", definitions_1.TT.Comment);
                for (; this.cursor < this.text.length; this.cursor++) {
                    if (this.text.charAt(this.cursor) == "\n") { // Move cursor until we find a break line, ignore whatever is found in that line
                        this.cursor--; // Decrease cursor by one such that next iteration adds \n to stack
                        break;
                    }
                }
                break;
            }
            case "{": { // Add new group token
                this.add_token("{", definitions_1.TT.GroupOpen);
                break;
            }
            case "}": { // Add new end token
                this.add_token("}", definitions_1.TT.GroupClose);
                break;
            }
            case "[": { // Add new group token
                this.add_token("[", definitions_1.TT.OptionalOpen);
                break;
            }
            case "]": { // Add new end token
                this.add_token("]", definitions_1.TT.OptionalClose);
                break;
            }
            default: {
                this.add_token(this.text.charAt(this.cursor), definitions_1.TT.Special);
                break;
            }
        }
    };
    Tokenizer.prototype.next = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.view(offset, offset);
    };
    // Gives us the rest of our string (cursor -> end)
    Tokenizer.prototype.view = function (offset, max_length) {
        if (offset === void 0) { offset = 0; }
        if (max_length === void 0) { max_length = 0; }
        if (max_length <= 0) { // If max_length not defined, return entire cut string
            return this.text.substring(this.cursor + offset);
        }
        else { // If not, cut off string with length of max length
            return this.text.substring(this.cursor + offset, (this.cursor + offset) + max_length);
        }
    };
    // Run the tokenizer on the text, character by character
    Tokenizer.prototype.read = function (text) {
        if (text === void 0) { text = this.text; }
        for (; this.cursor < text.length && !this.returnTokenizer; this.cursor++) {
            if (text.charAt(this.cursor) == "\\") { // If backslash character, call backslash routine
                this.backslash_handler();
            }
            else if (text.charAt(this.cursor).match(definitions_1.REG_SPECIAL)) { // If special character, call special char. routine
                this.special_char_handler();
            }
            else if (text.charAt(this.cursor) == "\n") { // If break line, count it and continue
                this.add_token("\n", definitions_1.TT.BreakLine);
                this.lineCursor++;
            }
            else {
                // Ignore
            }
        }
        return text;
    };
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;
