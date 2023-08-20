import { SudokuField } from "~/components/SudokuField";
import { useNewBoard } from "./utils/hooks/useNewBoard";

function App() {
  const { matrix, setXy, isSolved } = useNewBoard();

  return (
    <div className="flex flex-col h-full p-4 bg-yellow-50">
      <div className="flex items-center justify-center flex-1">
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
                    onChange={(value) => {
                      setXy(x, y, value);
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <p>{isSolved ? "Solved!" : "Not solved yet"}</p>
      </div>
    </div>
  );
}

export default App;
