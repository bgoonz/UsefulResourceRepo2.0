export function Stack({ children, className = "", spacing = "md" }) {
  return (
    <>
      <div className={`stack-${spacing} ${className}`}>{children}</div>

      <style jsx>{`
        .stack-2xs :global(> * + *) {
          margin-top: 0.3rem;
        }

        .stack-xs :global(> * + *) {
          margin-top: 0.5rem;
        }

        .stack-sm :global(> * + *) {
          margin-top: 1rem;
        }

        .stack-md :global(> * + *) {
          margin-top: 1.5rem;
        }

        .stack-lg :global(> * + *) {
          margin-top: 2rem;
        }

        .stack-xl :global(> * + *) {
          margin-top: 2.5rem;
        }
      `}</style>
    </>
  );
}
