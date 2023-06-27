"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var definitions_1 = require("./definitions");
var tokenizer_1 = require("./tokenizer");
var token_1 = require("./token");
var TokenTree = /** @class */ (function () {
    function TokenTree(parent, children) {
        if (children === void 0) { children = []; }
        this.children = [];
        this.name = parent.name;
        this.item = parent;
        this.children = children;
    }
    TokenTree.prototype.addChild = function (token) {
        if (token instanceof token_1.Token) {
            token = new TokenTree(token);
        }
        this.children.push(token);
    };
    return TokenTree;
}());
var Parser = /** @class */ (function () {
    function Parser(text) {
        this.cursor = 0;
        this.open = [];
        this.stack = [];
        this.text = text;
        var tokenizer = new tokenizer_1.Tokenizer(text);
        tokenizer.read();
        this.children = tokenizer.tokenStack;
    }
    // Where the parsing is done
    Parser.prototype.read = function () {
        for (; this.cursor < this.children.length; this.cursor++) {
            var token = this.children[this.cursor];
            if (this.is_closeable(token)) {
                this.open.push(token.type);
            }
            else if (this.is_closer(token)) {
                this.close(token);
            }
        }
        if (this.open.length > 0) {
            console.log("Not closed!");
        }
    };
    // Reads the environment
    Parser.prototype.read_env = function () {
        var token = this.get_current();
        if (token.type == definitions_1.TT.EnvOpen) {
        }
        else if (token.type == definitions_1.TT.EnvClose) {
        }
    };
    Parser.prototype.read_command = function () {
    };
    // Returns current token that our cursor points to 
    Parser.prototype.get_current = function () {
        return this.children[this.cursor];
    };
    // Moves the cursor to next position
    Parser.prototype.next = function () {
        this.cursor++;
    };
    // Returns whether the object is a token that must be closed
    Parser.prototype.is_closeable = function (token) {
        return definitions_1.CLOSEABLES.indexOf(token.type) != -1;
    };
    // Returns whether the object is a token that closes a closable
    Parser.prototype.is_closer = function (token) {
        return definitions_1.CLOSERS.indexOf(token.type) != -1;
    };
    // Matches a closer to it's closable and returns it, 
    Parser.prototype.matched_closeable = function (closer) {
        if (this.is_closer(closer)) {
            return definitions_1.CLOSEABLES[definitions_1.CLOSERS.indexOf(closer.type)]; // The #CLOSEABLES must have same #CLOSERS & and in the same order!
        }
        else {
            console.log(closer);
            throw new Error("The following token is not a closable, yet used 'match_closeable'!");
        }
    };
    // Given a Token of type "closer", it closes the closeable or adds an error
    Parser.prototype.close = function (closer) {
        var lastOpen = this.open.pop();
        if (lastOpen == this.matched_closeable(closer)) {
            return true;
        }
        else {
            console.log(this.matched_closeable(closer), lastOpen);
            console.log("Error, ".concat(closer.name, " not opened at line: ") + closer.line);
            return false;
        }
    };
    return Parser;
}());
exports.Parser = Parser;
