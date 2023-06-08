import { Cell } from './Cell';
import { Table } from '../Table';
import { CalcResult, Cords } from '../types';

export default class RecordCalcCell extends Cell {
  constructor(value: string | number, table: Table, cords: Cords) {
    const placeholder = 'f(x)';
    const styles: React.CSSProperties = { fontStyle: 'italic', background: '#ffefef38' };
    super(value, table, cords, styles, placeholder);
  }
  onChange(value: string): Table {
    if (value.trim() === '') {
      this.setValueNextColumn('');
      return this.getTable();
    }
    const result = this.calculateCells(this.getTable(), value);
    if (!result.error) {
      this.setValue(value);
      this.setValueNextColumn(result.value!);
    } else {
      this.setError();
    }
    return this.getTable();
  }

  private setValueNextColumn(value: number | string) {
    this.removeErrorStyle();
    this.getTable()
      .getCell(this.getRowIndex(), this.getColumnIndex() + 1)
      .setValue(value);
  }
  private setError() {
    this.addErrorStyle();
    this.setValue('error!');
    this.getTable()
      .getCell(this.getRowIndex(), this.getColumnIndex() + 1)
      .setValue('');
  }

  static builder(value: string | number, table: Table, cords: Cords): RecordCalcCell {
    return new RecordCalcCell(value, table, cords);
  }

  private calculate(formula: string): number {
    return eval(formula);
  }

  private calculateCells(tableData: Table, formula: string): CalcResult {
    try {
      const formulaWithValues: string = this.replaceIndexesForValues(tableData, formula);
      return { error: null, value: this.calculate(formulaWithValues) };
    } catch (error: any) {
      return { error: error, value: null };
    }
  }

  private replaceIndexesForValues(table: Table, formula: string): string {
    const cellIndexesRegexp = /\$(\d+):(\d+)/g;
    const cellsIndexes = formula.match(cellIndexesRegexp);
    cellsIndexes?.forEach((cellIndexes) => {
      const [cellCordY, cellCordX] = cellIndexes.substring(1).split(':');
      const cell = table.getCell(+cellCordX - 1, +cellCordY - 1);
      formula = formula.replace(cellIndexes, String(cell.getValue()));
    });
    return formula;
  }
}
