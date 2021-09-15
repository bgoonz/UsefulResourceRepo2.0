import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <hr />
      <p>&copy; {new Date().getFullYear()}, willjw3</p>
    </div>
  );
};

export default Footer;
