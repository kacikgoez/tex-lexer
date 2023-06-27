# LaTeX Parser
An unfinalized LaTeX parser written in TypeScript. Currently it contains a partially working lexer to parse through a LaTeX file and create a token list, which is used to detect 
some basic errors, such as too many open parenthesis or too many closed ones, closed and unclosed environments, square brackets, etc. There are a lot of edge cases to handle.
