type THeadingProps = {
  level: number;
};

export const Heading: React.FC<THeadingProps> = ({ children, level }) => {
  switch (level) {
    case 1:
      return <h1 className="mb-4 text-3xl">{children}</h1>;
    case 2:
      return <h2 className="mb-4 text-2xl">{children}</h2>;
    case 3:
      return <h3 className="mb-4 text-xl">{children}</h3>;
    case 4:
      return <h4 className="mb-4 text-lg">{children}</h4>;
    default:
      return null
  }
};
