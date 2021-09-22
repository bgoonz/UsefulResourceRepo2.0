import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-5 bg-dark">
      <div className="container">
        <p className="m-0 text-center text-white">
          Copyright &copy; Your Website 2019
        </p>
      </div>
      <Link href="/contact">
        <a className="nav-link" href="#">
          Contact
        </a>
      </Link>
    </footer>
  );
};

export default Footer;
