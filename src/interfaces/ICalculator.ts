import {Operators} from '../enums/Operators';

export interface ICalculator {
  result: string;
  operationString: string;
  history: OperationTree;
}

export type OperationTree = Operation[];

export type Operation = [number, Operators?];
