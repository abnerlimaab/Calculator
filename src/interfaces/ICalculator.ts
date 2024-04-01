import {Operators} from '../enums/Operators';

export interface ICalculator {
  result: string;
  operationString: string;
  history: [number, Operators?][];
}
