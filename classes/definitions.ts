// Regex: If at backslash, get the next command 
export const REG_TEXT_CHAR = /^[a-z]/ig;   // Single character command
export const REG_CMDNAME = /^[a-z]+(\*)?/ig;    // Get entire name 
export const REG_CMDSPACE = /^(\s)*(\n)?(\s)*/ig;

// Regex: general LaTeX special characters: https://www.dickimaw-books.com/latex/novices/html/symbols.html
export const REG_SPECIAL = /^[{}%&$#_^~\[\]\\]/g;
// Regex: Anything but the special chars
export const REG_TEXT = /^(([^\[\]{}%&$#_^~\\])|(\\[\[\]{}%&$#_^~\\]))+/g;

// Borrowed from TexSoup :3
export const SKIP_ENV_NAMES = ['lstlisting', 'verbatim', 'verbatimtab', 'Verbatim', 'listing'];
export const MATH_ENV_NAMES = [
    'align', 'align*', 'alignat', 'array', 'displaymath', 'eqnarray',
    'eqnarray*', 'equation', 'equation*', 'flalign', 'flalign*', 'gather',
    'gather*', 'math', 'multline', 'multline*', 'split'
];

// Enum for the LaTeX environment modes
export enum EnvTypes {
    TextMode,
    MathMode,
    TabbingMode,
    CommandMode
}

export enum TT {
    None,
    Command,
    Definition,
    Comment,
    BreakLine,
    Backslash,
    Escaped,
    Special,    // Special characters, such as _, |, ^ ...
    // Closeables
    EnvOpen,
    GroupOpen,
    OptionalOpen,
    DollarOpen,     // Single dollar math mode
    DoubleDollarOpen,    // Double dollar math mode
    SquareMathOpen, // \[ Math mode
    EnvClose,
    GroupClose,
    OptionalClose,
    DollarClose,     // Single dollar math mode
    DoubleDollarClose,    // Double dollar math mode
    SquareMathClose, // \[ Math mode
}

// Stuff that needs to be closed once opened
export const CLOSEABLES = [TT.EnvOpen, TT.GroupOpen, TT.OptionalOpen, TT.DollarOpen, TT.DoubleDollarOpen, TT.SquareMathOpen];
// Stuff that closes the above
export const CLOSERS = [TT.EnvClose, TT.GroupClose, TT.OptionalClose, TT.DollarClose, TT.DoubleDollarClose, TT.SquareMathClose];
