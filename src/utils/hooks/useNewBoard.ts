import { useMemo, useState } from "react";
import { parse } from "~/utils/sudoku";
import { defaultSudoku } from "~/constants";

export function useNewBoard() {
  const originalMatrix = useMemo(() => parse(defaultSudoku), []);
  const [matrix, setMatrix] = useState(originalMatrix);

  function setXy(x: number, y: number, value: number | null): void {
    const newMatrix = matrix.setXy(x, y, value).merge(originalMatrix);
    setMatrix(newMatrix);
  }

  return { matrix, setXy };
}
