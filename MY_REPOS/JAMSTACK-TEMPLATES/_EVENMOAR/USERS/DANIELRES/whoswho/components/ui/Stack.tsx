export const Stack: React.FC = ({ children }) => {
  return (
    <>
      <div>{children}</div>

      <style jsx>{`
        div :global(> div) {
          margin-bottom: 1rem;
        }
        div :global(> div:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
};
