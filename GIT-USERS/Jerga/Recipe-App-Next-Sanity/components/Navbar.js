import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link href="/">
        <a>Home</a>
      </Link>

      <style jsx>{`
        .navbar {
          position: absolute;
          inset: 0;
          margin: 1rem;
          padding: 0.7rem 3.5rem;
          height: 60px;
          font-size: 1.5rem;
          border: 1px solid #c4c4c4;
          font-weight: 500;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
