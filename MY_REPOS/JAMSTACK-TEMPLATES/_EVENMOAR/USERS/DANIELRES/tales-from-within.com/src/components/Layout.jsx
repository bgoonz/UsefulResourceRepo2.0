import { Ribbon } from "./ui/Ribbon";

export function Layout({ children }) {
  return (
    <>
      <Header />

      <div className="container mx-auto max-w-3xl text-center mb-16">
        {children}
      </div>
    </>
  );
}

function Header() {
  return (
    <div className="text-center md:mt-10 mb-12">
      <Ribbon>
        <div
          className="opacity-80 text-3xl text-white"
          style={{ textShadow: "0 0 16px #FFFFFF" }}
        >
          Tales from Within
        </div>
        <div
          className="text-md"
          style={{ textShadow: "0 0 16px #c722f5", color: "#837af2" }}
        >
          Inner &amp; outer space travels
        </div>
      </Ribbon>

      <style jsx>
        {`
          div {
            font-family: "Courier Prime";
          }
        `}
      </style>
    </div>
  );
}
