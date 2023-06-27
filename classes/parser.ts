import { TT, CLOSEABLES, CLOSERS } from "./definitions";
import { Tokenizer } from "./tokenizer";
import { Token } from "./token";

class TokenTree {

    name: string;
    item: Token;
    children: TokenTree[] = [];
    pointer: Token;

    constructor(parent: Token, children: TokenTree[] = []) {
        this.name = parent.name;
        this.item = parent;
        this.children = children;
    }

    addChild(token: Token | TokenTree) {
        if (token instanceof Token) {
            token = new TokenTree(token);
        }
        this.children.push(token);
    }

}

class Parser {

    text: string;
    children: Token[];
    cursor: number = 0;
    open: TT[] = [];
    stack: TokenTree[] = [];

    constructor(text: string) {
        this.text = text;
        let tokenizer = new Tokenizer(text);
        tokenizer.read();
        this.children = tokenizer.tokenStack;
    }

    // Where the parsing is done
    read() {
        for (; this.cursor < this.children.length; this.cursor++) {
            let token: Token = this.children[this.cursor];
            if (this.is_closeable(token)) {
                this.open.push(token.type);
            } else if (this.is_closer(token)) {
                this.close(token);
            }
        }

        if (this.open.length > 0) {
            console.log("Not closed!");
        }
    }

    // Reads the environment
    read_env() {
        let token = this.get_current();
        if (token.type == TT.EnvOpen) {
            this.open.push(token);
        } else if (token.type == TT.EnvClose) {

        }
    }

    read_command() {

    }

    // Returns current token that our cursor points to 
    get_current(): Token {
        return this.children[this.cursor];
    }

    // Moves the cursor to next position
    next(): void {
        this.cursor++;
    }

    // Returns whether the object is a token that must be closed
    is_closeable(token: Token): boolean {
        return CLOSEABLES.indexOf(token.type) != -1;
    }

    // Returns whether the object is a token that closes a closable
    is_closer(token: Token): boolean {
        return CLOSERS.indexOf(token.type) != -1;
    }

    // Matches a closer to it's closable and returns it, 
    matched_closeable(closer: Token): TT {
        if (this.is_closer(closer)) {
            return CLOSEABLES[CLOSERS.indexOf(closer.type)];    // The #CLOSEABLES must have same #CLOSERS & and in the same order!
        } else {
            console.log(closer);
            throw new Error("The following token is not a closable, yet used 'match_closeable'!");
        }
    }

    // Given a Token of type "closer", it closes the closeable or adds an error
    close(closer: Token) {
        let lastOpen = this.open.pop();
        if (lastOpen == this.matched_closeable(closer)) {
            return true;
        } else {
            console.log(this.matched_closeable(closer), lastOpen);
            console.log(`Error, ${closer.name} not opened at line: ` + closer.line)
            return false;
        }
    }
}

export { Parser };