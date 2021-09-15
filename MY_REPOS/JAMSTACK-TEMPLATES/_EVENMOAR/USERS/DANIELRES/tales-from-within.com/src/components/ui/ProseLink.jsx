export function ProseLink({ children, href, external = true }) {
  return (
    <>
      <a
        target={external ? "_blank" : "_self"}
        href={href}
        className="bg-blue-700 bg-opacity-30 inline-box px-1 whitespace-nowrap font-bold text-white  transition transition-opacity duration-200 opacity-80 hover:opacity-100"
      >
        {children}
      </a>

      <style jsx>{`
        a {
          padding-top: 1px;
          padding-bottom: 1px;
        }
      `}</style>
    </>
  );
}
