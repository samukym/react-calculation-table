import { Cell } from './cells/Cell';
import { Cords, TableValues } from './types';

export class Table {
  private cells: { [key: string]: Cell } = {};

  getCell(rowIndex: number, columnIndex: number) {
    const sparsePosition = this.getSparseRefFromIndexes(rowIndex, columnIndex);
    return this.cells[sparsePosition];
  }

  private getSparseRefFromIndexes(rowIndex: number, columnIndex: number): string {
    return `${columnIndex}-${rowIndex}`;
  }

  setCell(cell: Cell) {
    const sparsePosition = this.getSparseRefFromIndexes(cell.getRowIndex(), cell.getColumnIndex());
    this.cells[sparsePosition] = cell;
  }

  addNewColumnToTable(
    cellBuilder: (value: string | number, table: Table, cords: Cords) => Cell,
  ): Table {
    const nRows = this.getNumberOfRows();
    const nColumns = this.getNumberOfColumns();
    [...Array(nRows).keys()].forEach((rowIndex) => {
      const cords: Cords = { rowIndex, columnIndex: nColumns };
      this.cells[`${nColumns}-${rowIndex}`] = cellBuilder('', this, cords);
    });
    return this;
  }

  addNewRowToTable(
    cellBuilder: (value: string | number, table: Table, cords: Cords) => Cell,
  ): Table {
    const nRows = this.getNumberOfRows();
    const nColumns = this.getNumberOfColumns();
    [...Array(nColumns).keys()].forEach((columnIndex) => {
      const cords: Cords = { columnIndex, rowIndex: nRows };
      this.cells[`${columnIndex}-${nRows}`] = cellBuilder('', this, cords);
    });
    return this;
  }

  getNumberOfRows(): number {
    const cells = Object.keys(this.cells);
    const numberOfCells = cells.length;
    const numberOfColumns = this.getNumberOfColumns();
    return numberOfCells / numberOfColumns;
  }

  getNumberOfColumns(): number {
    const cells = Object.keys(this.cells);
    const lastCellIndexes = cells[cells.length - 1];
    const lastCellColumnIndex = +lastCellIndexes.split('-')[0];
    return lastCellColumnIndex + 1;
  }

  static createFrom(table: TableValues): Table {
    let newTable = new Table();
    for (const cellIndex in table) {
      const cords: Cords = {
        rowIndex: +cellIndex.split('-')[1],
        columnIndex: +cellIndex.split('-')[0],
      };
      newTable.cells[cellIndex] = new Cell(table[cellIndex], newTable, cords);
    }
    return newTable;
  }
}
