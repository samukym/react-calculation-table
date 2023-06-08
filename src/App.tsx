import React from 'react';
import './App.css';
import CalcTable from './CalculationTable/components/Table.component';
import Header from './CalculationTable/components/Header.component';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="tablee">
        <CalcTable />
      </div>
      <div className="help-container">
        <div className="help">
          <h3>Instructions</h3>
          There are two types of cells:
          <ul>
            <li>
              Calculation Cells (
              <i>
                <b>f(x)</b>
              </i>
              ) : perform calculations using formulas based on the values in other cells within the
              same row (or other row). To access the values of other cells, you can use the notation `<b>$</b>
              <i>column_index</i>
              <b>:</b>
              <i>row_index</i>`.
              <br></br>For example, to sum the values of the first record and multiply them by 3,
              you can write the formula as follows: <i>($2:1 + $3:1) * 3</i>.
              <br />
              For more information about how to write the formula checkout this page:{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval">
                eval
              </a>
              .
            </li>
            <li>
              Aggregation Cells (
              <i>
                <b>Σ</b>
              </i>
              ) : allow you to perform operations across all records in a specific column. You can
              choose between two operations: sum and mean. To select one of these operations, simply
              type <i>sum</i> or <i>mean</i>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
