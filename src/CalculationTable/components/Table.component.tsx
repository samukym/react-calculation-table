import { useState } from 'react';
import { Column, EditableCell2, Table2 } from '@blueprintjs/table';
import { getTable } from '../services/CalculationTable.service';

const columnsHeader = [
  { columnName: 'Time', columnType: 'time', columnId: 'time_col' },
  { columnName: 'Cell Density', columnType: 'data', columnId: 'var_col_1' },
  { columnName: 'Volume', columnType: 'data', columnId: 'var_col_2' },
  { columnName: 'Formula', columnType: 'data', columnId: 'var_col_3' },
  { columnName: 'Result', columnType: 'data', columnId: 'var_col_4' },
];

const CalcTable: React.FC = () => {
  const [table, setTable] = useState(getTable());

  const onCellChange = (value: string, rowIndex: number, columnIndex: number) => {
    setTable(table.getCell(rowIndex, columnIndex).onChange(value));
  };

  const cellRenderer = (rowIndex: number, columnIndex: number) => {
    const cell = table.getCell(rowIndex, columnIndex);
    const value = cell.getValue();
    return (
      <EditableCell2
        value={String(value)}
        onConfirm={(v: string) => onCellChange(v, rowIndex, columnIndex)}
        style={cell.getStyles()}
        placeholder={cell.getPlaceholder()}
      />
    );
  };

  const cols = columnsHeader.map((column) => (
    <Column key={`${column.columnId}`} cellRenderer={cellRenderer} name={column.columnName} />
  ));

  return (
    <Table2 defaultRowHeight={30} numRows={table.getNumberOfRows()} enableFocusedCell={true}>
      {cols}
    </Table2>
  );
};

export default CalcTable;
