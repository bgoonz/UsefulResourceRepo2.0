const Portfolio = require("../models/portfolio");
const moment = require("moment");

exports.getPortfolios = (req, res, next) => {
  return Portfolio.find({}, (err, foundPortfolios) => {
    if (err) {
      return res.status(422).send(normalizeErrors(err.errors));
    }

    return res.json({ portfolios: foundPortfolios });
    // return res.status(422).send([{title: 'FUck you'}])
  });
};

exports.getSecret = (req, res, next) => {
  return res.json({ secret: "I ate your cookies!!!" });
};

exports.createPortfolio = (req, res, next) => {
  const portfolioData = req.body;
  const { startAt, endAt } = portfolioData;

  if (startAt && endAt && moment(endAt).isBefore(moment(startAt))) {
    return res
      .status(422)
      .send([
        { title: "Date Error", detail: "End Date cannot be before start date" },
      ]);
  }

  const portfolio = new Portfolio(portfolioData);

  portfolio.save((err, createdPortfolio) => {
    if (err) {
      console.log(err);
      return res.status(422).send(normalizeErrors(err.errors));
    }

    return res.json({ portfolio: createdPortfolio });
  });
};

function normalizeErrors(errors) {
  let normalizeErrors = [];

  for (let property in errors) {
    if (errors.hasOwnProperty(property)) {
      normalizeErrors.push({
        title: property,
        detail: errors[property].message,
      });
    }
  }

  return normalizeErrors;
}
