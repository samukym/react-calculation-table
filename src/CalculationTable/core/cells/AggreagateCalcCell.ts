import { Cell } from './Cell';
import { Table } from '../Table';
import { CalcResult, Cords } from '../types';

export class AggregateCalcCell extends Cell {
  constructor(value: string | number, table: Table, cords: Cords) {
    const placeholder = 'Σ';
    const styles: React.CSSProperties = { fontStyle: 'italic', background: '#ffefef38' };
    super(value, table, cords, styles, placeholder);
  }
  // TODO: refactor to achieve Open-Closed Principle
  onChange(value: string): Table {
    if (value.trim().toLowerCase() === 'sum') {
      this.setValue('sum');
      this.sumColumn();
    } else if (value.trim().toLowerCase() === 'mean') {
      this.setValue('mean');
      this.meanColumn();
    } else if (value.trim() === '') {
      this.setValue('');
      this.setValueNextRow('');
    } else {
      this.setError();
    }
    return this.getTable();
  }

  static builder(value: string | number, table: Table, cords: Cords): Cell {
    return new AggregateCalcCell(value, table, cords);
  }

  private meanColumn(): Table {
    const columnValues = this.getColumnValues();
    const result = this.mean(columnValues);
    this.setResult(result);
    return this.getTable();
  }

  private sumColumn(): Table {
    const columnValues = this.getColumnValues();
    const result = this.sum(columnValues);
    this.setResult(result);
    return this.getTable();
  }

  private getColumnValues(): Array<number> {
    return counterFromZeroTo(this.getRowIndex()).map(
      (index) => +this.getTable().getCell(index, this.getColumnIndex()).getValue(),
    );
  }

  private setResult(result: CalcResult) {
    if (!result.error) {
      this.setValueNextRow(result.value!);
    } else {
      this.setError();
    }
  }
  private setValueNextRow(value: number | string) {
    this.removeErrorStyle();
    this.getTable()
      .getCell(this.getRowIndex() + 1, this.getColumnIndex())
      .setValue(value);
  }
  private setError() {
    this.addErrorStyle();
    this.setValue('error!');
    this.getTable()
      .getCell(this.getRowIndex() + 1, this.getColumnIndex())
      .setValue('');
  }

  private sum(numbers: Array<number>): CalcResult {
    const resultValue = numbers.reduce((accSum, curr) => accSum + curr, 0);
    if (isNaN(resultValue)) {
      return { error: 'Sum failed', value: null };
    }
    return { error: null, value: resultValue };
  }

  private mean(numbers: Array<number>): CalcResult {
    const sumResult = this.sum(numbers);
    if (sumResult.error) {
      return sumResult;
    }
    const divisionValue = sumResult.value! / numbers.length;
    if (isNaN(divisionValue)) {
      return { error: 'Mean failed', value: null };
    }
    return { error: null, value: divisionValue };
  }
}

function counterFromZeroTo(length: number): Array<number> {
  return [...Array(length).keys()];
}
