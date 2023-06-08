import { Table } from '../Table';
import { Cords } from '../types';

export class Cell {
  private cords: Cords;
  private value: string | number;
  private table: Table;
  private styles?: React.CSSProperties;
  private placeholder?: string;

  constructor(
    value: string | number,
    table: Table,
    cords: Cords,
    styles?: React.CSSProperties,
    placeholder?: string,
  ) {
    this.value = value;
    this.table = table;
    this.cords = cords;
    this.styles = styles;
    this.placeholder = placeholder;
  }
  onChange(value: string): Table {
    this.setValue(value);
    return this.table;
  }
  getValue() {
    return this.value;
  }
  setValue(value: string | number) {
    this.value = value;
  }
  getTable() {
    return this.table;
  }
  getRowIndex() {
    return this.cords.rowIndex;
  }
  getColumnIndex() {
    return this.cords.columnIndex;
  }
  getStyles() {
    return this.styles;
  }
  addErrorStyle() {
    this.styles = { ...this.styles, border: 'solid 1px red' };
  }
  removeErrorStyle() {
    this.styles = { ...this.styles, border: 'inherit' };
  }
  getPlaceholder() {
    return this.placeholder;
  }

  static builder(value: string | number, table: Table, cords: Cords): Cell {
    return new Cell(value, table, cords);
  }
}
