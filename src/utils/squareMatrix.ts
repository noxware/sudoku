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

  columns(): T[][] {
    const columns: T[][] = [];
    for (let x = 0; x < this.size; x++) {
      const column: T[] = [];
      for (let y = 0; y < this.size; y++) {
        column.push(this.xy(x, y));
      }
      columns.push(column);
    }
    return columns;
  }

  private copy(): SquareMatrix<T> {
    return new SquareMatrix(this.size, (x, y) => this.xy(x, y));
  }

  merge(other: SquareMatrix<T>): SquareMatrix<T> {
    if (this.size !== other.size) {
      throw new Error("Cannot merge matrices of different sizes");
    }

    return new SquareMatrix(this.size, (x, y) => {
      return other.xy(x, y) ?? this.xy(x, y);
    });
  }

  partition(partitionSize: number): SquareMatrix<SquareMatrix<T>> {
    if (this.size % partitionSize !== 0) {
      throw new Error(
        `Cannot partition matrix of size ${this.size} into squares of size ${partitionSize}`
      );
    }

    const partitions = new SquareMatrix(this.size / partitionSize, (p, q) => {
      const partition = new SquareMatrix(partitionSize, (x, y) => {
        return this.xy(p * partitionSize + x, q * partitionSize + y);
      });
      return partition;
    });

    return partitions;
  }

  flatten(): T[] {
    return this.rows().flat();
  }

  nextCyclicCoordinates(x: number, y: number): { x: number; y: number } {
    if (x === this.size - 1 && y === this.size - 1) {
      return { x: 0, y: 0 };
    }

    if (x === this.size - 1) {
      return { x: 0, y: y + 1 };
    }

    return { x: x + 1, y };
  }
}
