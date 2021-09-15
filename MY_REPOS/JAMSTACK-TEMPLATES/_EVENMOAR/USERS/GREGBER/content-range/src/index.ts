interface Range {
  unit: string;
  start?: number | null;
  end?: number | null;
  size?: number | null;
}

/**
 * Format Content-Range header.
 */
export function format(input: Range): string | null {
  const size = input.size != null ? input.size : "*";
  const range =
    input.start == null && input.end == null
      ? "*"
      : `${input.start}-${input.end}`;
  if (size === "*" && range === "*") return null;
  if (range !== "*" && (input.start == null || input.end == null)) return null;
  return `${input.unit} ${range}/${size}`;
}

/**
 * Parse Content-Range header.
 */
export function parse(input: string): Range | null {
  const matches = input.match(/^(\w+) ((\d+)-(\d+)|\*)\/(\d+|\*)$/);
  if (!matches) return null;
  const [, unit, , start, end, size] = matches;
  const range = {
    unit,
    start: start != null ? Number(start) : null,
    end: end != null ? Number(end) : null,
    size: size === "*" ? null : Number(size),
  };
  if (range.start === null && range.end === null && range.size === null)
    return null;
  return range;
}
