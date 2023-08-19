function key(x: number, y: number): string {
  return `${x},${y}`;
}

export class SquareMatrix<T> {
  private readonly coords: Map<string, T>;

  constructor(
    public readonly size: number,
    compute: (x: number, y: number) => T
  ) {
    this.coords = new Map();
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        this.coords.set(key(x, y), compute(x, y));
      }
    }
  }

  checkCoordinates(x: number, y: number): void {
    if (x < 0 || x > this.size || y < 0 || y > this.size) {
      throw new Error(`Invalid coordinates: (${x}, ${y})`);
    }
  }

  xy(x: number, y: number): T {
    this.checkCoordinates(x, y);
    return this.coords.get(key(x, y)) as T;
  }

  setXy(x: number, y: number, value: T): SquareMatrix<T> {
    this.checkCoordinates(x, y);
    const matrix = this.copy();
    matrix.coords.set(key(x, y), value);
    return matrix;
  }

  rows(): T[][] {
    const rows: T[][] = [];
    for (let y = 0; y < this.size; y++) {
      const row: T[] = [];
      for (let x = 0; x < this.size; x++) {
        row.push(this.xy(x, y));
      }
      rows.push(row);
    }
    return rows;
  }

  private copy(): SquareMatrix<T> {
    return new SquareMatrix(this.size, (x, y) => this.xy(x, y));
  }
}
