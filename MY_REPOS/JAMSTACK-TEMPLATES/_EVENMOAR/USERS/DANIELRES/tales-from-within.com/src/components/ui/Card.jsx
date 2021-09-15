export function Card({ children, compact = false, transparent = false }) {
  return (
    <div
      className={`${transparent ? "" : "bg-black bg-opacity-30 md:rounded"} ${
        compact ? "py-2 px-4" : "p-6"
      }`}
    >
      {children}
    </div>
  );
}
