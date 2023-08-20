import { useMemo, useState } from "react";
import { parse, isSolved } from "~/utils/sudoku";
import { defaultSudoku } from "~/constants";

export function useNewBoard() {
  const originalMatrix = useMemo(() => parse(defaultSudoku), []);
  const [matrix, setMatrix] = useState(originalMatrix);

  function setXy(x: number, y: number, value: number | null): void {
    const newMatrix = matrix.setXy(x, y, value).merge(originalMatrix);
    setMatrix(newMatrix);
  }

  function wasPrefilled(x: number, y: number): boolean {
    return originalMatrix.xy(x, y) !== null;
  }

  return { matrix, setXy, isSolved: isSolved(matrix), wasPrefilled };
}
