import { useState } from "react";
import { SquareMatrix } from "~/utils/squareMatrix";
import { SudokuField } from "~/components/SudokuField";

function App() {
  const [matrix, setMatrix] = useState(
    () => new SquareMatrix<number | null>(9, () => null)
  );

  return (
    <div className="flex items-center justify-center h-full bg-yellow-50">
      <table className="border-collapse table-auto">
        <tbody>
          {matrix.rows().map((row, y) => (
            <tr key={y}>
              {row.map((_, x) => (
                <SudokuField
                  key={x}
                  x={x}
                  y={y}
                  value={matrix.xy(x, y)}
                  onChange={(value) => setMatrix(matrix.setXy(x, y, value))}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
