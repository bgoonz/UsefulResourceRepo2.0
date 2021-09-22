import React from "react";
import Facebook from "../images/facebook.svg";
import Instagram from "../images/instagram.svg";
import "../styles/footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <hr />
      <div className="footer-contents">
        <div className="footer-contents-social">
          <div className="footer-contents-social-icon">
            <img src={Facebook} alt="" />
          </div>
          <div className="footer-contents-social-icon">
            <img src={Instagram} alt="" />
          </div>
        </div>
        <p>© {new Date().getFullYear()} TOKYO ALEWORKS</p>
      </div>
    </div>
  );
};

export default Footer;
