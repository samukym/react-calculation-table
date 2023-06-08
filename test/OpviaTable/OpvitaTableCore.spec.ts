import { Cell } from '../../src/CalculationTable/core/cells/Cell';
import RecordCalcCell from '../../src/CalculationTable/core/cells/RecordCalcCell';
import { Table } from './../../src/CalculationTable/core/Table';
import { AggregateCalcCell } from '../../src/CalculationTable/core/cells/AggreagateCalcCell';
import { ResultCalcCell } from '../../src/CalculationTable/core/cells/ResultCalcCell';

import { TableValues } from '../../src/CalculationTable/core/types';

const dummyTableData: TableValues = {
  '0-0': '2021-01-01T20:39:26.023Z',
  '0-1': '2021-01-02T20:39:26.023Z',
  '0-2': '2021-01-03T20:39:26.023Z',
  '1-0': 100,
  '1-1': 120,
  '1-2': 140,
  '2-0': 990,
  '2-1': 980,
  '2-2': 970,
};

const createTable = (tableData: TableValues) => {
  const table = Table.createFrom(tableData);
  table.addNewRowToTable(AggregateCalcCell.builder);
  table.addNewRowToTable(ResultCalcCell.builder);
  table.addNewColumnToTable(RecordCalcCell.builder);
  table.addNewColumnToTable(ResultCalcCell.builder);
  return table;
};

let table: Table;
describe('Given an Calculation Table', () => {
  beforeAll(() => {
    table = createTable(dummyTableData);
  });
  
  describe('when a record calc cell changes', () => {
    test('it should give an error when the formula has cells are out of the table', () => {
      const columnIndex = 3;
      const rowIndex = 0;
      table = table.getCell(rowIndex, columnIndex).onChange('$50:1+$3:1');
      const resultValue = table.getCell(rowIndex, columnIndex).getValue();
      expect(resultValue).toBe('error!');
    });
    test('it should compute the formula and store the result in the next column cell', () => {
      const columnIndex = 3;
      const rowIndex = 0;
      table = table.getCell(rowIndex, columnIndex).onChange('$2:1+$3:1');
      const resultValue = table.getCell(rowIndex, columnIndex + 1).getValue();
      expect(+resultValue).toBe(1090);
    });
  });
  describe("when a aggreate calc cell changes and the input it's SUM", () => {
    test('it should compute the operation sum through every element in that column', () => {
      const columnIndex = 1;
      const rowIndex = table.getNumberOfRows() - 2;
      table = table.getCell(rowIndex, columnIndex).onChange('sum');
      const resultValue = table.getCell(rowIndex + 1, columnIndex).getValue();
      expect(+resultValue).toBe(100 + 120 + 140);
    });
  });
  describe("when a aggreate calc cell changes and the input it's MEAN", () => {
    test('it should compute the operation mean with every element in that column', () => {
      const columnIndex = 1;
      const rowIndex = table.getNumberOfRows() - 2;
      table = table.getCell(rowIndex, columnIndex).onChange('mean');
      const resultValue = table.getCell(rowIndex + 1, columnIndex).getValue();
      expect(+resultValue).toBe((100 + 120 + 140) / 3);
    });
  });
});
