import {isOperator} from '../enums/Operators';
import {ICalculator} from '../interfaces/ICalculator';

export const initialState: ICalculator = {
  result: '0',
  operationString: '',
  history: [],
};

export function onOperationStringChange(
  state: ICalculator,
  nextChar: string,
): ICalculator {
  console.log('state', state.history);

  const lastChar = nextChar[nextChar.length - 1];

  if (state.history.length === 0 && !isOperator(lastChar)) {
    return {
      ...state,
      operationString: nextChar,
      history: [[Number(nextChar), undefined]],
    };
  }

  const newHistory = [...state.history];
  const lastHistoryIndex = newHistory.length - 1;

  if (Number(lastChar) || lastChar === '0' || lastChar === '.') {
    newHistory[lastHistoryIndex][0] =
      Number(`${newHistory[lastHistoryIndex][0]}${lastChar}`) || 0;

    return {
      ...state,
      operationString: `${state.operationString}${lastChar}`,
      history: newHistory,
    };
  }

  if (isOperator(lastChar)) {
    newHistory[lastHistoryIndex][1] = lastChar;

    return {
      ...state,
      operationString: `${state.operationString}${lastChar}`,
      history: [...newHistory, [0, undefined]],
    };
  }

  return {
    ...state,
    operationString: nextChar,
  };
}
