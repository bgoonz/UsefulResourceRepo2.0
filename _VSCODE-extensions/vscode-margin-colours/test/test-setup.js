process.env.NODE_ENV = "test";

const chai = require("chai");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
