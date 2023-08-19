import { SquareMatrix } from "./squareMatrix";

export function parse(input: string): SquareMatrix<number | null> {
  const rows = input
    .split("\n")
    .map((row) => row.replaceAll(" ", ""))
    .filter((row) => row);

  const matrix = new SquareMatrix(9, (x, y) => {
    const value = parseInt(rows[y]?.[x], 10);

    if (isNaN(value)) {
      throw new Error(`Invalid input value at (${x}, ${y}): ${rows[y][x]}`);
    }

    // 0 will be returned as null.
    return value || null;
  });

  return matrix;
}
