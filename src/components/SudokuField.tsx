interface Props {
  value: number | null;
  x: number;
  y: number;
  onChange: (value: number | null) => void;
}

export function SudokuField(props: Props) {
  const isTop = props.y % 3 === 0;
  const isLeft = props.x % 3 === 0;
  const isRight = props.x % 3 === 2;
  const isBottom = props.y % 3 === 2;

  const borderStyle = [
    isTop ? "border-t-4" : "border-t-2",
    isLeft ? "border-l-4" : "border-l-2",
    isRight ? "border-r-4" : "border-r-2",
    isBottom ? "border-b-4" : "border-b-2",
  ].join(" ");

  return (
    <td className={`border-black ${borderStyle} bg-yellow-200`}>
      <input
        type="text"
        maxLength={1}
        className="w-16 p-2 text-center bg-transparent outline-none aspect-square"
        value={props.value ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "") {
            props.onChange(null);
          } else {
            const number = Number(value);
            if (Number.isNaN(number) || number < 1 || number > 9) {
              return;
            }
            props.onChange(number);
          }
        }}
      />
    </td>
  );
}
