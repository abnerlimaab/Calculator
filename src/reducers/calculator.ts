import {ICalculator} from '../interfaces/ICalculator';
import {onOperationStringChange} from '../store/calculator';
import {CalculatorActions} from '../types/actions/CalculatorActions';

export function calculatorReducer(
  state: ICalculator,
  action: CalculatorActions,
): ICalculator {
  switch (action.type) {
    case 'CHANGE_OPERATION':
      return onOperationStringChange(state, action.payload);
    default:
      return state;
  }
}
