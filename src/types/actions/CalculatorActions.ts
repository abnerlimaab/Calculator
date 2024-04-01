export enum CalculatorActionsType {
  CHANGE_OPERATION = 'CHANGE_OPERATION',
}

export type CalculatorActions = {
  type: CalculatorActionsType.CHANGE_OPERATION;
  payload: string;
};
