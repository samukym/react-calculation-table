import { Table } from '../Table';
import { Cords } from '../types';
import { Cell } from './Cell';

export class ResultCalcCell extends Cell {
  constructor(value: string | number, table: Table, cords: Cords) {
    const styles: React.CSSProperties = {
      pointerEvents: 'none',
      background: '#F5F5F5',
      fontWeight: "600"
    };
    super(value, table, cords, styles);
  }
  static builder(value: string | number, table: Table, cords: Cords): Cell {
    return new ResultCalcCell(value, table, cords);
  }
}
