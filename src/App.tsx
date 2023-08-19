import { SudokuField } from "~/components/SudokuField";
import { useNewBoard } from "./utils/hooks/useNewBoard";

function App() {
  const { matrix, setXy } = useNewBoard();

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
                  onChange={(value) => setXy(x, y, value)}
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
