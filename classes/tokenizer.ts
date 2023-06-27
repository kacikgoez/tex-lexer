import { TT, REG_CMDNAME, REG_SPECIAL, REG_TEXT } from "./definitions";
import { Token } from "./token";

class Tokenizer {

    cursor: number = 0;         // The current position of our cursor in the given LaTeX document
    lineCursor: number = 0;     // The current line position
    tokenStack: Token[] = [];   // The tokens we have already found
    text: string;               // The document we are currently looking at
    returnTokenizer: boolean = false;

    constructor(text: string, cursor: number = 0, nestedIn: TT = TT.None) {
        this.cursor = cursor;
        this.text = text;
    }

    // Add a token to the stack
    add_token(name: any, type: TT, cursor: number = this.cursor, lineCursor: number = this.lineCursor) {
        let token = new Token(name, cursor, lineCursor, type);
        this.tokenStack.push(token);
    }

    // Routine if we stumble on a backslash
    backslash_handler() {
        if (this.view(1).match(REG_CMDNAME)) {          // Find name for command / definition etc. 
            let cmdName: string = this.view(1).match(REG_CMDNAME)[0];
            if (cmdName == "begin") {
                this.add_token(cmdName, TT.EnvOpen);
            } else if (cmdName == "end") {
                this.add_token(cmdName, TT.EnvClose);
            } else {
                this.add_token(cmdName, TT.Command);
            }
            this.cursor += cmdName.length;
        } else if (this.view(1).match(REG_SPECIAL)) {   // Skip the special character, it's an escaped char.
            this.cursor += 1;
        } else if (this.next() == "[") {                // Opening of square math mode
            this.add_token("[", TT.SquareMathOpen);
        } else if (this.next() == "]") {                // Closing of square math mode
            this.add_token("]", TT.SquareMathClose);
        } else if (this.next().match(/^\s$/)) {         // Single backslash without any function (maybe not needed?)
            this.add_token("\\", TT.Backslash);
        } else {
            this.add_token(this.next(), TT.Escaped);    // Add scaped character
        }
    }

    // Routine if we stumble on a special character (besides \)
    special_char_handler() {
        switch (this.text.charAt(this.cursor)) {
            case "%": { // Single line comment, ends when we enter a new line
                this.add_token("%", TT.Comment);
                for (; this.cursor < this.text.length; this.cursor++) {
                    if (this.text.charAt(this.cursor) == "\n") {    // Move cursor until we find a break line, ignore whatever is found in that line
                        this.cursor--;  // Decrease cursor by one such that next iteration adds \n to stack
                        break;
                    }
                }
                break;
            }
            case "{": {  // Add new group token
                this.add_token("{", TT.GroupOpen);
                break;
            }
            case "}": { // Add new end token
                this.add_token("}", TT.GroupClose);
                break;
            }
            case "[": {  // Add new group token
                this.add_token("[", TT.OptionalOpen);
                break;
            }
            case "]": { // Add new end token
                this.add_token("]", TT.OptionalClose);
                break;
            }
            default: {
                this.add_token(this.text.charAt(this.cursor), TT.Special);
                break;
            }
        }
    }

    next(offset: number = 1): string {
        return this.view(offset, offset);
    }

    // Gives us the rest of our string (cursor -> end)
    view(offset: number = 0, max_length: number = 0): string {
        if (max_length <= 0) {  // If max_length not defined, return entire cut string
            return this.text.substring(this.cursor + offset);
        } else {                // If not, cut off string with length of max length
            return this.text.substring(this.cursor + offset, (this.cursor + offset) + max_length);
        }
    }

    // Run the tokenizer on the text, character by character
    read(text: string = this.text) {
        for (; this.cursor < text.length && !this.returnTokenizer; this.cursor++) {
            if (text.charAt(this.cursor) == "\\") {                     // If backslash character, call backslash routine
                this.backslash_handler();
            } else if (text.charAt(this.cursor).match(REG_SPECIAL)) {   // If special character, call special char. routine
                this.special_char_handler();
            } else if (text.charAt(this.cursor) == "\n") {              // If break line, count it and continue
                this.add_token("\n", TT.BreakLine);
                this.lineCursor++;
            } else {
                // Ignore
            }
        }
        return text;
    }

}


export { Tokenizer };