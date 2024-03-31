export enum Operators {
    Rubber = '\u232B',
    Divide = '\u00F7',
    Multiply = 'x',
    Subtract = '-',
    Add = '+',
    Equal = '=',
    Erase = 'C',
    PlusMinus = '+/-',
    Percent = '%',
}

export function isOperator(value: string): value is Operators {
    return Object.values(Operators).includes(value as Operators);
}