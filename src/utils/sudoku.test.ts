import { isSolved, parse } from "./sudoku";

describe("isSolved", () => {
  it("should return true for a solved sudoku", () => {
    const sudoku = parse(`
      534678912
      672195348
      198342567
      859761423
      426853791
      713924856
      961537284
      287419635
      345286179
    `);

    expect(isSolved(sudoku)).toBe(true);
  });

  it("should return false for an unsolved sudoku", () => {
    const sudoku = parse(`
      534678912
      672195348
      198342567
      859761423
      426853791
      713924856
      961537284
      287419635
      345286171
    `);

    expect(isSolved(sudoku)).toBe(false);
  });
});
