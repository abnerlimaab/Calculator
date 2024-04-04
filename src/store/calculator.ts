import {isOperator, Operators} from '../enums/Operators';
import {History, HistoryItem, ICalculator} from '../interfaces/ICalculator';

export const initialState: ICalculator = {
  result: '0',
  operationString: '',
  history: [],
};

export function onOperationStringChange(
  state: ICalculator,
  nextChar: string,
): ICalculator {
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

    const historyHandler = HistoryHandler(newHistory);

    const historyResult = historyHandler
      .map(resolveMultiplicationAndDivision)
      .map(resolveAdditionAndSubtraction).history;

    return {
      ...state,
      operationString: `${state.operationString}${lastChar}`,
      history: historyHandler.history,
      result: historyResult[0][0].toString(),
    };
  }

  if (isOperator(lastChar)) {
    newHistory[lastHistoryIndex][1] = lastChar;

    const historyHandler = HistoryHandler([...newHistory, [0, undefined]]);

    return {
      ...state,
      operationString: `${state.operationString}${lastChar}`,
      history: historyHandler.history,
    };
  }

  return {
    ...state,
    operationString: nextChar,
  };
}

function resolveOperationBetweenHistoryItems(
  x: HistoryItem,
  y: HistoryItem,
): HistoryItem {
  const [a, operatorA] = x;
  const [b, operatorB] = y;

  switch (operatorA) {
    case Operators.Add:
      return [a + b, operatorB];
    case Operators.Subtract:
      return [a - b, operatorB];
    case Operators.Multiply:
      return [a * b, operatorB];
    case Operators.Divide:
      return [a / b, operatorB];
    default:
      return y;
  }
}

interface IHistoryHandler {
  history: History;
  map: (
    callback: (a: HistoryItem, b: HistoryItem) => [HistoryItem, HistoryItem?],
  ) => IHistoryHandler;
}

function HistoryHandler(history: History): IHistoryHandler {
  function map(
    _history: History,
    callback: (a: HistoryItem, b: HistoryItem) => [HistoryItem, HistoryItem?],
  ): History {
    if (_history.length === 1) {
      return _history;
    }

    const copyHistory = [..._history];

    for (let i = 0; i < copyHistory.length - 1; i++) {
      const [a, b] = callback(copyHistory[i], copyHistory[i + 1]);

      if (b) {
        copyHistory[i] = a;
        copyHistory[i + 1] = b;
      } else {
        copyHistory[i] = a;
        copyHistory.splice(i + 1, 1);
        i--;
      }
    }

    return copyHistory;
  }

  return {
    history,
    map: callback => HistoryHandler(map(history, callback)),
  };
}

function resolveMultiplicationAndDivision(
  a: HistoryItem,
  b: HistoryItem,
): [HistoryItem, HistoryItem?] {
  const aOperator = a[1];

  if (aOperator === Operators.Multiply || aOperator === Operators.Divide) {
    return [resolveOperationBetweenHistoryItems(a, b), undefined];
  }

  return [a, b];
}

function resolveAdditionAndSubtraction(
  a: HistoryItem,
  b: HistoryItem,
): [HistoryItem, HistoryItem?] {
  const aOperator = a[1];

  if (aOperator === Operators.Add || aOperator === Operators.Subtract) {
    return [resolveOperationBetweenHistoryItems(a, b), undefined];
  }

  return [a, b];
}
