function escape(s) {
  const lookup = {
    "&": "&amp;",
    '"': "&quot;",
    "<": "&lt;",
    ">": "&gt;"
  };
  return s.replace(/[&"<>]/g, c => lookup[c]);
}

module.exports = { escape };
