module.exports = {
  normalizeErrors: (errors) => {
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
  },
};
