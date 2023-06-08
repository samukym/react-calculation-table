import { dummyTableData as tableData } from '../../data/dummyData';
import { AggregateCalcCell } from '../core/cells/AggreagateCalcCell';
import RecordCalcCell from '../core/cells/RecordCalcCell';
import { ResultCalcCell } from '../core/cells/ResultCalcCell';
import { Table } from '../core/Table';
import { Cords } from '../core/types';

export const getTable = (): Table => {
  let table: Table = Table.createFrom(tableData);
  table.addNewColumnToTable(RecordCalcCell.builder);
  table.addNewRowToTable(AggregateCalcCell.builder);
  table.addNewRowToTable(ResultCalcCell.builder);
  table.addNewColumnToTable(ResultCalcCell.builder);
  
  const recordResultColumnIndex = table.getNumberOfColumns() - 1;
  const aggreagateCalcRowIndex = table.getNumberOfRows() - 2;
  const cordsAggregateResultCell: Cords = {
    rowIndex: aggreagateCalcRowIndex,
    columnIndex: recordResultColumnIndex,
  };
  table.setCell(new AggregateCalcCell('', table, cordsAggregateResultCell));
  const cordsAggregateFormulaCell: Cords = {
    rowIndex: aggreagateCalcRowIndex,
    columnIndex: recordResultColumnIndex - 1,
  };
  table.setCell(new ResultCalcCell('', table, cordsAggregateFormulaCell));
  return table;
};
