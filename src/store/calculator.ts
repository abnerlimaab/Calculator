import {isOperator, Operators} from '../enums/Operators';
import {OperationTree, Operation, ICalculator} from '../interfaces/ICalculator';

export const initialState: ICalculator = {
  result: '0',
  operationString: '',
  history: [],
};

export function onOperationStringChange(
  state: ICalculator,
  nextChar: string,
): ICalculator {
  if (isOperator(nextChar) && nextChar === Operators.Erase) {
    return {
      operationString: '',
      history: [],
      result: '0',
    };
  }

  const [operationTree, newString] = createOperationTree(
    state.operationString + nextChar,
  );
  const historyHandler = HistoryHandler(operationTree);
  const historyResult = historyHandler
    .map(resolveMultiplicationAndDivision)
    .map(resolveAdditionAndSubtraction).history;

  return {
    ...state,
    operationString: newString,
    history: historyHandler.history,
    result: isNaN(historyResult[0][0]) ? ' ' : historyResult[0][0].toString(),
  };

  // const lastChar = nextChar[nextChar.length - 1];

  // if (state.history.length === 0 && !isOperator(lastChar)) {
  //   return {
  //     ...state,
  //     operationString: nextChar,
  //     history: [[Number(nextChar), undefined]],
  //   };
  // }

  // const newHistory = [...state.history];
  // const lastHistoryIndex = newHistory.length - 1;

  // if (Number(lastChar) || lastChar === '0' || lastChar === '.') {
  //   const floatPoint = state.operationString.endsWith('.') ? '.' : '';

  //   newHistory[lastHistoryIndex][0] =
  //     Number(`${newHistory[lastHistoryIndex][0]}${floatPoint}${lastChar}`) || 0;

  //   const historyHandler = HistoryHandler(newHistory);
  //   const historyResult = historyHandler
  //     .map(resolveMultiplicationAndDivision)
  //     .map(resolveAdditionAndSubtraction).history;

  //   return {
  //     ...state,
  //     operationString: `${state.operationString}${lastChar}`,
  //     history: historyHandler.history,
  //     result: isNaN(historyResult[0][0]) ? ' ' : historyResult[0][0].toString(),
  //   };
  // }

  // if (isOperator(lastChar)) {
  //   if (state.operationString.length === 0) {
  //     return state;
  //   }

  //   if (lastChar === Operators.Rubber) {
  //     if (newHistory[lastHistoryIndex][1]) {
  //       newHistory[lastHistoryIndex][1] = undefined;

  //       const historyHandler = HistoryHandler(newHistory);
  //       const historyResult = historyHandler
  //         .map(resolveMultiplicationAndDivision)
  //         .map(resolveAdditionAndSubtraction).history;

  //       return {
  //         ...state,
  //         operationString: state.operationString.slice(0, -1),
  //         history: historyHandler.history,
  //         result: historyResult[0][0].toString(),
  //       };
  //     } else {
  //       if (newHistory[lastHistoryIndex][0].toString().length === 1) {
  //         newHistory.pop();
  //       } else {
  //         newHistory[lastHistoryIndex][0] = Math.floor(
  //           newHistory[lastHistoryIndex][0] / 10,
  //         );
  //       }

  //       const historyHandler = HistoryHandler(newHistory);
  //       const historyResult = historyHandler
  //         .map(resolveMultiplicationAndDivision)
  //         .map(resolveAdditionAndSubtraction).history;

  //       return {
  //         ...state,
  //         operationString: state.operationString.slice(0, -1),
  //         history: historyHandler.history,
  //         result: historyResult[0][0].toString(),
  //       };
  //     }
  //   }

  //   if (newHistory[lastHistoryIndex]) {
  //     if (lastChar === Operators.Percent) {
  //       newHistory[lastHistoryIndex][0] = newHistory[lastHistoryIndex][0] / 100;

  //       const historyHandler = HistoryHandler(newHistory);
  //       const historyResult = historyHandler
  //         .map(resolveMultiplicationAndDivision)
  //         .map(resolveAdditionAndSubtraction).history;

  //       return {
  //         ...state,
  //         operationString: `${state.operationString}${lastChar}`,
  //         history: historyHandler.history,
  //         result: historyResult[0][0].toString(),
  //       };
  //     } else {
  //       newHistory[lastHistoryIndex][1] = lastChar;
  //     }
  //   }

  //   if (lastChar === Operators.Equal) {
  //     return {
  //       ...state,
  //       operationString: '',
  //       history: [],
  //     };
  //   }

  //   if (lastChar === Operators.Erase) {
  //     return {
  //       operationString: '',
  //       history: [],
  //       result: '0',
  //     };
  //   }

  //   const historyHandler = HistoryHandler([...newHistory, [0, undefined]]);

  //   return {
  //     ...state,
  //     operationString: `${state.operationString}${lastChar}`,
  //     history: historyHandler.history,
  //   };
  // }

  // return {
  //   ...state,
  //   operationString: nextChar,
  // };
}

function resolveOperationBetweenHistoryItems(
  x: Operation,
  y: Operation,
): Operation {
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
      if (b === 0) {
        return [NaN, operatorB];
      }
      return [a / b, operatorB];
    default:
      return y;
  }
}

interface IHistoryHandler {
  history: OperationTree;
  map: (
    callback: (a: Operation, b: Operation) => [Operation, Operation?],
  ) => IHistoryHandler;
}

function HistoryHandler(history: OperationTree): IHistoryHandler {
  function map(
    _history: OperationTree,
    callback: (a: Operation, b: Operation) => [Operation, Operation?],
  ): OperationTree {
    if (_history.length <= 1) {
      return [[0, undefined]];
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
  a: Operation,
  b: Operation,
): [Operation, Operation?] {
  const aOperator = a[1];

  if (aOperator === Operators.Multiply || aOperator === Operators.Divide) {
    return [resolveOperationBetweenHistoryItems(a, b), undefined];
  }

  return [a, b];
}

function resolveAdditionAndSubtraction(
  a: Operation,
  b: Operation,
): [Operation, Operation?] {
  const aOperator = a[1];

  if (aOperator === Operators.Add || aOperator === Operators.Subtract) {
    return [resolveOperationBetweenHistoryItems(a, b), undefined];
  }

  return [a, b];
}

export function createOperationTree(
  operationStr: string,
): [OperationTree, string] {
  const operationTree: OperationTree = [];

  if (operationStr.length === 0) {
    return [operationTree, ''];
  }

  for (let i = 0; i < operationStr.length; i++) {
    const char = operationStr[i];

    if (Number(char) || char === '0' || char === '.') {
      const lastOperation = operationTree[operationTree.length - 1];
      const floatPoint = operationStr[i - 1] === '.' ? '.' : '';

      if (lastOperation && lastOperation[1]) {
        operationTree.push([Number(char)]);
        continue;
      }

      if (lastOperation && Number(lastOperation[0])) {
        operationTree[operationTree.length - 1][0] = Number(
          `${lastOperation[0]}${floatPoint}${char}`,
        );
      } else {
        operationTree.push([Number(char)]);
      }
    }

    if (isOperator(char)) {
      if (char === Operators.Rubber) {
        const stringWithoutLastChar = operationStr.slice(0, -2);
        return createOperationTree(stringWithoutLastChar);
      }

      if (operationTree.length === 0) {
        return [operationTree, operationStr];
      } else if (char === Operators.Percent) {
        operationTree[operationTree.length - 1][0] /= 100;
      } else {
        operationTree[operationTree.length - 1][1] = char;
      }
    }
  }

  return [operationTree, operationStr];
}
