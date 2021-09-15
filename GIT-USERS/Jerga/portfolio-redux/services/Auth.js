import auth0 from "auth0-js";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import fetch from "isomorphic-unfetch";

class Auth {
  constructor() {
    const redirectUri =
      process.env.NODE_ENV === "production"
        ? "https://port-fel.herokuapp.com"
        : "http://localhost:3000";

    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: "eincode.eu.auth0.com",
      audience: "https://eincode.eu.auth0.com/userinfo",
      clientID: "N1hKhhP0PacJO4EjIWURIcnzBt88P3Q1",
      redirectUri: `${redirectUri}/callback`,
      responseType: "token id_token",
      scope: "openid profile app_metadata",
    });

    this._isFetching = false;

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  async getTokenForBrowser() {
    const token = Cookie.getJSON("jwt");
    const validToken = await this.verifyToken(token);
    if (validToken) {
      return Cookie.getJSON("user");
    }
  }

  async getTokenForServer(req) {
    if (req.headers.cookie) {
      const jwtFromCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("jwt="));
      if (!jwtFromCookie) {
        return undefined;
      }
      const token = jwtFromCookie.split("=")[1];
      const validToken = await this.verifyToken(token);
      if (validToken) {
        return jwt.decode(token);
      } else {
        return undefined;
      }
    }
  }

  async getJWK() {
    const res = await fetch(
      `https://eincode.eu.auth0.com/.well-known/jwks.json`
    );
    const jwk = await res.json();
    return jwk;
  }

  async verifyToken(token) {
    if (token) {
      const decodedToken = jwt.decode(token, { complete: true });
      const jwk = await this.getJWK();
      let cert = jwk.keys[0].x5c[0];
      cert = cert.match(/.{1,64}/g).join("\n");
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
      if (jwk.keys[0].kid === decodedToken.header.kid) {
        try {
          jwt.verify(token, cert);
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
    }
  }

  setSession(authResult, step) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    Cookie.set("user", authResult.idTokenPayload);
    Cookie.set("jwt", authResult.idToken);
  }

  signOut() {
    this.auth0.logout({
      returnTo: "",
      clientID: "N1hKhhP0PacJO4EjIWURIcnzBt88P3Q1",
    });

    Cookie.remove("jwt");
    Cookie.remove("user");
  }

  silentAuth() {
    this._isFetching = true;

    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) {
          this._isFetching = false;
          return reject(err);
        }

        this.setSession(authResult);
        this._isFetching = false;
        resolve();
      });
    });
  }

  isFetching() {
    return this._isFetching;
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }
}

const auth0Client = new Auth();

export default auth0Client;
