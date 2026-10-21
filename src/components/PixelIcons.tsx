// Tiny pixel-art glyphs drawn from string bitmaps ("#" = filled pixel).
// They inherit the text colour and scale with font-size (1em tall).

function Pixels({ rows, className, title }: { rows: string[]; className?: string; title?: string }) {
  const h = rows.length;
  const w = rows[0].length;
  const rects: React.ReactNode[] = [];
  rows.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c === "#") rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" />);
    })
  );
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={"inline-block h-[0.82em] w-auto align-[-0.02em] " + (className ?? "")}
      fill="currentColor"
      shapeRendering="crispEdges"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {rects}
    </svg>
  );
}

const SUN_FILLED = [
  "......#......",
  "..#...#...#..",
  "...#.....#...",
  ".....###.....",
  "....#####....",
  "...#######...",
  "##.#######.##",
  "...#######...",
  "....#####....",
  ".....###.....",
  "...#.....#...",
  "..#...#...#..",
  "......#......",
];

const SUN_OUTLINE = [
  "......#......",
  "..#...#...#..",
  "...#.....#...",
  ".....###.....",
  "....#...#....",
  "...#.....#...",
  "##.#.....#.##",
  "...#.....#...",
  "....#...#....",
  ".....###.....",
  "...#.....#...",
  "..#...#...#..",
  "......#......",
];

const SPARKLES = [
  "......#.......",
  "......#.......",
  "....#####.....",
  "......#.....#.",
  "......#.....#.",
  "..#.......#####",
  "..#.........#..",
  "#####.......#..",
  "..#..........",
  "..#.....#....",
  "........#....",
  "......#####..",
  "........#....",
  "........#....",
].map((r) => r.padEnd(15, "."));

const LAPTOP = [
  "..###########..",
  "..#.........#..",
  "..#.#.....#.#..",
  "..#.........#..",
  "..#..#...#..#..",
  "..#...###...#..",
  "..#.........#..",
  "..###########..",
  ".#############.",
  "###############",
];

export const PixelSun = (p: { className?: string }) => <Pixels rows={SUN_FILLED} {...p} />;
export const PixelSunOutline = (p: { className?: string }) => <Pixels rows={SUN_OUTLINE} {...p} />;
export const PixelSparkles = (p: { className?: string }) => <Pixels rows={SPARKLES} {...p} />;
export const PixelLaptop = (p: { className?: string }) => <Pixels rows={LAPTOP} {...p} />;
