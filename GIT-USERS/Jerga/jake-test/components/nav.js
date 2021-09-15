//import Link from 'next/link'
import auth0 from "../services/auth0";
// import SideDrawer from './drawer'

const Login = () => {
  return (
    <button type="button" onClick={auth0.login}>
      Sign n
    </button>
  );
};

const Logout = () => {
  return (
    <button type="button" onClick={auth0.logout}>
      Logout
    </button>
  );
};

const Nav = () => {
  return (
    <>
      <header>
        <img id="logo" src="/logo.svg" alt="DooZone logo" />
        <span className="country">Switzerland en</span>
        <div id="menu">
          <button type="button" className="active">
            Discover
          </button>
          <button type="button">My Classes</button>
          <button type="button">My Points</button>
          {auth0.isAuthenticated() === false && <Login />}
          {auth0.isAuthenticated() && (
            <>
              {/* <SideDrawer /> */}
              <Logout />
            </>
          )}
        </div>
      </header>
      <style jsx>{`
        header {
          display: flex;
          padding: 20px 10px 0 10px;
          margin-bottom: 20px;
        }

        #logo {
          width: 70px;
        }

        .country {
          color: #ffffff;
          margin-top: 12px;
        }

        #menu {
          margin-left: auto;
          margin-top: 5px;
          margin-right: 13px;
        }
      `}</style>
    </>
  );
};

export default Nav;
