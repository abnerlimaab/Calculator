import {it, describe, expect} from '@jest/globals';
import {createOperationTree} from '../../src/store/calculator';
import {Operators} from '../../src/enums/Operators';

describe('Create Operation Tree', () => {
  it('should add two numbers', () => {
    const [operationTree] = createOperationTree(`3${Operators.Add}2`);

    expect(operationTree).toEqual([[3, Operators.Add], [2]]);
  });

  it('should subtract two numbers', () => {
    const [operationTree] = createOperationTree(`3${Operators.Subtract}2`);

    expect(operationTree).toEqual([[3, Operators.Subtract], [2]]);
  });

  it('should multiply two numbers', () => {
    const [operationTree] = createOperationTree(`3${Operators.Multiply}2`);

    expect(operationTree).toEqual([[3, Operators.Multiply], [2]]);
  });

  it('should divide two numbers', () => {
    const [operationTree] = createOperationTree(`3${Operators.Divide}2`);

    expect(operationTree).toEqual([[3, Operators.Divide], [2]]);
  });

  it('should create operation between three numbers', () => {
    const [operationTree] = createOperationTree(
      `3${Operators.Add}2${Operators.Multiply}2`,
    );

    expect(operationTree).toEqual([
      [3, Operators.Add],
      [2, Operators.Multiply],
      [2],
    ]);
  });

  it('should create operation between four numbers', () => {
    const [operationTree] = createOperationTree(
      `3${Operators.Add}2${Operators.Multiply}2${Operators.Add}2`,
    );

    expect(operationTree).toEqual([
      [3, Operators.Add],
      [2, Operators.Multiply],
      [2, Operators.Add],
      [2],
    ]);
  });

  it('should create operation between five numbers', () => {
    const [operationTree] = createOperationTree(
      `3${Operators.Add}2${Operators.Multiply}2${Operators.Add}2${Operators.Divide}2`,
    );

    expect(operationTree).toEqual([
      [3, Operators.Add],
      [2, Operators.Multiply],
      [2, Operators.Add],
      [2, Operators.Divide],
      [2],
    ]);
  });

  it('should preserve float numbers', () => {
    const [operationTree] = createOperationTree(`3.1${Operators.Add}2.2`);

    expect(operationTree).toEqual([[3.1, Operators.Add], [2.2]]);
  });

  it('should preserve float numbers with multiple digits', () => {
    const [operationTree] = createOperationTree(`3.123${Operators.Add}2.234`);

    expect(operationTree).toEqual([[3.123, Operators.Add], [2.234]]);
  });

  it('should lead with percentage', () => {
    const [operationTree] = createOperationTree(`3${Operators.Percent}`);

    expect(operationTree).toEqual([[0.03]]);
  });

  it('should lead with percentage and operator', () => {
    const [operationTree] = createOperationTree(
      `3${Operators.Percent}${Operators.Add}2`,
    );

    expect(operationTree).toEqual([[0.03, Operators.Add], [2]]);
  });

  it('should clear last character', () => {
    const [operationTree1] = createOperationTree(`3${Operators.Rubber}`);
    const [operationTree2] = createOperationTree(`321${Operators.Rubber}`);
    const [operationTree3] = createOperationTree(
      `3${Operators.Add}2${Operators.Rubber}`,
    );

    expect(operationTree1).toEqual([]);
    expect(operationTree2).toEqual([[32]]);
    expect(operationTree3).toEqual([[3, Operators.Add]]);
  });
});
