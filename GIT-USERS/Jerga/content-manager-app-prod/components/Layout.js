import Navbar from "components/Navbar";
import ActiveResource from "components/ActiveResource";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <ActiveResource />
    {children}
  </>
);

export default Layout;
