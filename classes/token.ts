import { TT } from "./definitions";

class Token {

    name: any;
    cursor: number;
    line: number;
    type: TT;

    constructor(name: any, cursor: number, line: number, type: TT) {
        this.name = name;
        this.cursor = cursor;
        this.line = line;
        this.type = type;
    }

}

export { Token };