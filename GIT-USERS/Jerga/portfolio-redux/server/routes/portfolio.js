const express = require("express");
const router = express.Router();

const auth = require("../services/auth-service");

const PortfolioCtrl = require("../controllers/portfolio");

router.get("", PortfolioCtrl.getPortfolios);

router.post(
  "",
  auth.checkJwt,
  auth.checkSuperAdmin,
  PortfolioCtrl.createPortfolio
);

router.get(
  "/secret",
  auth.checkJwt,
  auth.checkSuperAdmin,
  PortfolioCtrl.getSecret
);

module.exports = router;
