import {Operators} from '../enums/Operators';

export interface ICalculator {
  result: string;
  operationString: string;
  history: History;
}

export type History = HistoryItem[];

export type HistoryItem = [number, Operators?];
